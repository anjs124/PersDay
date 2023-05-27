import cv2
import numpy as np
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask import jsonify, url_for
import os


# 전역 변수로 선언
r1, g1, b1, r2, g2, b2, h1, s1, v1, h2, s2, v2 = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # 허용할 도메인 추가

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    global r1, g1, b1, r2, g2, b2, h1, s1, v1, h2, s2, v2
    global img
    file = request.files['file']
    filename = file.filename
    img_bytes = file.read()
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # 얼굴 검출기 불러오기
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')

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
        b1, g1, r1 = face_img[center[1], center[0]]
        # RGB를 HSV로 변환
        hsv = cv2.cvtColor(np.uint8([[[r1, g1, b1]]]), cv2.COLOR_BGR2HSV)
        h1, s1, v1 = hsv[0][0]
        print("face_img 중앙부의 HSV값: ", h1, s1, v1)

        # hair_img 중앙부의 RGB값 추출
        h, w, _ = hair_img.shape
        center = (int(w/2), int(h/2))
        b2, g2, r2 = hair_img[center[1], center[0]]
        # RGB를 HSV로 변환
        hsv = cv2.cvtColor(np.uint8([[[r2, g2, b2]]]), cv2.COLOR_BGR2HSV)
        h2, s2, v2 = hsv[0][0]
        print("hair_img 중앙부의 HSV값: ", h2, s2, v2)

    # 결과 출력
    cv2.imwrite('result.jpg', img)

    return 'File uploaded successfully.' 


@app.route('/result', methods=['GET'])
def result():
    # 이미지 분석 결과를 가지고 있는 딕셔너리를 생성합니다.
    result_dict = {'face_hsv': [int(r1), int(g1), int(b1), int(h1), int(s1), int(v1)], 'hair_hsv': [int(r2), int(g2), int(b2), int(h2), int(s2), int(v2)]}
    
    # JSON으로 변환하여 반환합니다.
    return jsonify(result_dict)





UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/images/<tonename>')
def get_images(tonename):
    image_names = []
    folder_path = os.path.join(app.config['UPLOAD_FOLDER'], tonename)

    # "봄", "여름", "가을", "겨울" 폴더들의 경로를 생성
    season_folders = [os.path.join(folder_path, season) for season in ["봄", "여름", "가을", "겨울"]]

    # 모든 폴더에서 이미지 파일을 찾아서 리스트에 추가
    for season_folder in season_folders:
        if os.path.isdir(season_folder):
            for filename in os.listdir(season_folder):
                if filename.endswith('.jpg') or filename.endswith('.png'):
                    image_names.append(os.path.join(season_folder, filename))

    # URL 리스트 생성
    urls = []
    for image_name in image_names:
        url = f"{image_name}"
        urls.append(url)

    return jsonify(urls)

@app.route('/images/<tonename>/<season>')
def get_images2(tonename, season):
    image_names = []
    folder_path = os.path.join(app.config['UPLOAD_FOLDER'], tonename, season)

    if os.path.isdir(folder_path):
        for filename in os.listdir(folder_path):
            if filename.endswith('.jpg') or filename.endswith('.png'):
                image_names.append(os.path.join(folder_path, filename))

    urls = []
    for image_name in image_names:
        url = f"{image_name}"
        urls.append(url)

    return jsonify(urls)



if __name__ == "__main__":
    app.run()