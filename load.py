import cv2
import numpy as np
import os
import matplotlib.pyplot as plt

# 画像ファイルのパス
current_directory = os.getcwd()
image_filename = "mnt/data/image2.png"
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

        # 白線の範囲を定義（HSV）
        lower_white = np.array([0, 0, 240])
        upper_white = np.array([180, 10, 255])

        # 白線領域のマスクを作成
        white_mask = cv2.inRange(hsv_image, lower_white, upper_white)

        # 白線を検出
        edges = cv2.Canny(white_mask, 50, 150)

        # ハフ変換を用いて直線を検出
        lines = cv2.HoughLinesP(edges, 1, np.pi/180, 50, maxLineGap=50)
        road_image = image.copy()
        if lines is not None:
            for line in lines:
                x1, y1, x2, y2 = line[0]
                cv2.line(road_image, (x1, y1), (x2, y2), (0, 255, 255), 2)

        # 道路部分の色を変える
        # グレーの範囲を定義（HSV）
        lower_gray = np.array([0, 0, 100])
        upper_gray = np.array([180, 40, 210])

        # グレー領域のマスクを作成
        gray_mask = cv2.inRange(hsv_image, lower_gray, upper_gray)
        
        # 白線の間のグレー部分を抽出
        

        # グレー領域の輪郭を検出
        gray_contours, _ = cv2.findContours(gray_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        # 小さい領域を除外して赤色に変更
        min_area = 30000  # 最小面積の閾値
        for contour in gray_contours:
            area = cv2.contourArea(contour)
            if area > min_area:
                cv2.drawContours(road_image, [contour], -1, (0, 0, 255), -1)

        # 結果を表示
        plt.imshow(cv2.cvtColor(road_image, cv2.COLOR_BGR2RGB))
        plt.title("Road with White Lines and Red Colored Gray Area")
        plt.show()

    except Exception as e:
        print("エラーが発生しました:", e)