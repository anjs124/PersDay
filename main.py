# 봄 타입: 밝고 화사한 컬러를 좋아하며, 황토색과 노란색 베이스의 웜톤 피부를 가지고 있습니다. 주로 밝은 황금색, 연한 노랑색, 연한 녹색, 연한 퍼플 등의 색상이 어울립니다.
#
# 여름 타입: 차분하고 부드러운 컬러를 좋아하며, 분홍빛 베이스의 쿨톤 피부를 가지고 있습니다. 주로 연한 분홍색, 연한 퍼플, 연한 블루, 연한 그레이 등의 색상이 어울립니다.
#
# 가을 타입: 노란색, 주황색 베이스의 웜톤 피부를 가지고 있으며, 자연스러운 컬러를 좋아합니다. 주로 노란갈색, 연한 오렌지색, 연한 그린, 브라운 등의 색상이 어울립니다.
#
import os
import requests
from bs4 import BeautifulSoup
from io import BytesIO
from PIL import Image
import matplotlib.pyplot as plt

# 사용자가 입력한 검색어 받아오기
search_word = input('검색어를 입력하세요: ')
save_dir = input('이미지를 저장할 폴더 경로를 입력하세요: ')

# 폴더가 존재하지 않는 경우 생성
if not os.path.exists(save_dir):
    os.makedirs(save_dir)

for i in range(1, 10):
    # URL을 요청하고 HTML 가져오기
    url = f'https://www.musinsa.com/mz/brandsnap?_m=&gender=&mod=&bid=&p={i}'
    response = requests.get(url)
    html_content = response.content

    # BeautifulSoup 객체 생성
    soup = BeautifulSoup(html_content, 'html.parser')

    # alt 속성이 입력한 검색어를 포함하는 모든 이미지 태그 선택
    images = soup.find_all('img', alt=lambda x: x and search_word in x)

    # 이미지 다운로드 및 저장
    if images:
        for idx, img in enumerate(images):
            # 이미지 다운로드
            img_url = img['src']
            img_data = requests.get(img_url).content

            # 이미지 열기
            img = Image.open(BytesIO(img_data))

            # 이미지 화면에 출력
            plt.imshow(img)
            plt.show()

            # 이미지 저장
            filename = f"{search_word}_{i}_{idx}.jpg"
            filepath = os.path.join(save_dir, filename)
            img.save(filepath)
        else:
            print('이미지를 찾을 수 없습니다.')
