import cv2
import numpy as np

# モデルの設定ファイルと重みファイルのパス
config_path = 'yolov3.cfg'
weights_path = 'yolov3.weights'
names_path = 'coco.names'

# クラス名を読み込む
with open(names_path, 'r') as f:
    classes = [line.strip() for line in f.readlines()]

# ネットワークを読み込む
net = cv2.dnn.readNet(weights_path, config_path)

# 画像を読み込む
image_path = 'mnt2/data/image2.png'
image = cv2.imread(image_path)

# 画像のサイズを取得
height, width = image.shape[:2]

# 画像を前処理して入力データを作成
blob = cv2.dnn.blobFromImage(image, 0.00392, (416, 416), swapRB=True, crop=False)
net.setInput(blob)

# 出力レイヤー名を取得
layer_names = net.getLayerNames()
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]

# 順伝播して推論結果を取得
outs = net.forward(output_layers)

# 検出結果を解析
class_ids = []
confidences = []
boxes = []

for out in outs:
    for detection in out:
        scores = detection[5:]
        class_id = np.argmax(scores)
        confidence = scores[class_id]
        if confidence > 0.5 and classes[class_id] == 'person':
            center_x = int(detection[0] * width)
            center_y = int(detection[1] * height)
            w = int(detection[2] * width)
            h = int(detection[3] * height)

            x = int(center_x - w / 2)
            y = int(center_y - h / 2)

            boxes.append([x, y, w, h])
            confidences.append(float(confidence))
            class_ids.append(class_id)

# ノンマキシマムサプレッションで冗長なボックスを削除
indices = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

# 結果を画像に描画
for i in range(len(boxes)):
    if i in indices:
        x, y, w, h = boxes[i]
        label = str(classes[class_ids[i]])
        confidence = confidences[i]
        color = (0, 255, 0)
        cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)
        cv2.putText(image, f'{label} {confidence:.2f}', (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

# 検出結果を表示
cv2.imshow('Image', image)
cv2.waitKey(0)
cv2.destroyAllWindows()








