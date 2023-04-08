import cv2
import numpy as np
import matplotlib.pyplot as plt

def display_color(color):
    r, g, b = color
    plt.imshow([[(r/255, g/255, b/255)]], aspect='auto')
    plt.axis('off')
    plt.show()

# 얼굴 검출기 불러오기
face_cascade = cv2.CascadeClassifier('C:/Users/Seungseok/Desktop/opencv-master/data/haarcascades/haarcascade_frontalface_alt.xml')

# 이미지 불러오기
img = cv2.imread("C:/Users/Seungseok/Desktop//ai/ccc.jpeg")

# 얼굴 검출
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

# 검출된 얼굴을 기준으로 머리와 얼굴 구분하기
for (x, y, w, h) in faces:
    # 얼굴 영역 추출
    face_img = img[y:y+h, x:x+w]
    
    # 얼굴 영역 기준으로 머리 영역 추출 (예시 코드는 상단 1/4 구간을 머리 영역으로 설정함)
    hair_img = img[y:y+int(h/4), x:x+int(w/4)]
    
    # 얼굴과 머리에 사각형 그리기
    cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
    cv2.rectangle(img, (x, y), (x+w, y+int(h/4)), (0, 0, 255), 2)
    cv2.rectangle(img, (x, y), (x+int(w/4), y+int(h/10)), (0, 0, 255), 2)

     # face_img 중앙부의 RGB값 추출
    h, w, _ = face_img.shape
    center = (int(w/2), int(h/2))
    b, g, r = face_img[center[1], center[0]]
    print("face_img 중앙부의 RGB값: ", r, g, b)
    display_color((r,g,b))

    # hair_img 중앙부의 RGB값 추출
    h, w, _ = hair_img.shape
    center = (int(w/2), int(h/2))
    b, g, r = hair_img[center[1], center[0]]
    print("hair_img 중앙부의 RGB값: ", r, g, b)
    display_color((r,g,b))


# 결과 출력
cv2.imshow('result', img)
cv2.waitKey(0)
cv2.destroyAllWindows()

