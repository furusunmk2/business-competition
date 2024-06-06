import cv2
import numpy as np
import os
import matplotlib.pyplot as plt

# 画像ファイルのパス
current_directory = os.getcwd()
image_filename = "mnt/data/image.png"
image_path = os.path.join(current_directory, image_filename)

# ファイルが存在するか確認する
if not os.path.exists(image_path):
    print(f"ファイルが存在しません: {image_path}")
else:
    try:
        # 画像を読み込む
        image = cv2.imread(image_path)

        # 画像が正しく読み込まれたか確認する
        if image is None:
            raise ValueError(f"画像 {image_path} を読み込めませんでした。")

        print(f"画像 {image_path} を読み込みました。")

        # HSV色空間に変換
        hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

        # 赤色の範囲を定義（HSV）
        lower_red1 = np.array([0, 70, 50])
        upper_red1 = np.array([10, 255, 255])
        lower_red2 = np.array([170, 70, 50])
        upper_red2 = np.array([180, 255, 255])

        # 赤色領域のマスクを作成
        mask1 = cv2.inRange(hsv_image, lower_red1, upper_red1)
        mask2 = cv2.inRange(hsv_image, lower_red2, upper_red2)
        red_mask = cv2.bitwise_or(mask1, mask2)

        # マスク処理された画像を表示
        plt.imshow(red_mask, cmap="gray")
        plt.title("Red Mask")
        plt.show()

        # 輪郭を検出
        contours, _ = cv2.findContours(red_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        # 輪郭を描画
        contour_image = image.copy()
        for contour in contours:
            # 輪郭の面積を計算して小さい輪郭は無視する
            area = cv2.contourArea(contour)
            if area > 1500:
                # 輪郭の中心を計算
                M = cv2.moments(contour)
                if M["m00"] != 0:
                    cX = int(M["m10"] / M["m00"])
                    cY = int(M["m01"] / M["m00"])
                    # 中心に円を描く
                    cv2.circle(contour_image, (cX, cY), 100, (0, 255, 0), 2)
                    # 輪郭を描画
                    cv2.drawContours(contour_image, [contour], -1, (0, 255, 0), 2)

        # 結果を表示
        plt.imshow(cv2.cvtColor(contour_image, cv2.COLOR_BGR2RGB))
        plt.title("Detected Stop Signs")
        plt.show()

    except Exception as e:
        print("エラーが発生しました:", e)