# 봄 웜톤 : 황토색, 연두색, 라임그린, 연분홍, 노란색 등
# 여름 쿨톤 : 연한 회색, 청록색, 분홍색, 보라색, 파란색 등
# 가을 웜톤 : 노란갈색, 주황색, 황금색, 갈색, 녹색 등
# 겨울 쿨톤 : 검정색, 하얀색, 분홍색, 블루, 레드 등

import os
import requests
from bs4 import BeautifulSoup
from io import BytesIO
from PIL import Image
import matplotlib.pyplot as plt
import random
# 브랜드는 아직 선별중입니다.
seasons = ['봄', '여름', '가을', '겨울']
search_dict = {
    '봄': ['데쌍트', '키르시'],
    '여름': ['디쏘에이치', '키르시'],
    '가을': ['더마일', '니티드'],
    '겨울': ['엠엠엘지', '록캐스트']
}
search_words = input('봄, 여름, 가을, 겨울 중 어느 시즌의 옷을 검색하시겠습니까? ')

# 사용자가 입력한 시즌에 해당하는 검색어들 받아오기
if search_words in seasons:
    search_word_list = search_dict[search_words]
    search_word = '|'.join(search_word_list)
else:
    print('봄, 여름, 가을, 겨울 중에서만 입력해주세요.')
    exit()

# 이미지를 저장할 폴더 경로 받아오기
save_dir = 'Today_Daily'

# 폴더가 존재하지 않는 경우 생성
if not os.path.exists(save_dir):
    os.makedirs(save_dir)

# 이미지 저장 리스트
images_saved = []

# 페이지 단위로 스크래핑
for i in range(1, 5):
    # URL을 요청하고 HTML 가져오기
    url = f'https://www.musinsa.com/mz/brandsnap?p={i}'
    response = requests.get(url)
    html_content = response.content

    # BeautifulSoup 객체 생성
    soup = BeautifulSoup(html_content, 'html.parser')

    # alt 속성이 입력한 검색어들 중 하나를 포함하는 모든 이미지 태그 선택
    images = soup.find_all('img', alt=lambda x: x and any(word in x for word in search_word_list))

    # 이미지 다운로드 및 저장
    if images:
        for idx, img in enumerate(images):
            # 이미지 다운로드
            img_url = img['src']
            img_data = requests.get(img_url).content

            # 이미지 저장
            filename = f"image_{i}_{idx}.jpg"
            filepath = os.path.join(save_dir, filename)

            if os.path.exists(filepath):
                # 이미지가 이미 존재하는 경우, 건너뛰기
                print(f'{filepath} 이미지가 이미 존재합니다.')
                continue

            # 이미지 열기
            img = Image.open(BytesIO(img_data))

            # 이미지 저장
            img.save(filepath)
            print(f'{filepath} 이미지를 저장했습니다.')
            images_saved.append(img)

    else:
        print(f'{search_word}에 대한 이미지를 찾을 수 없습니다.')

# 이미지 출력
n_images_saved = len(images_saved)
if n_images_saved > 0:
    if n_images_saved > 10:
        images_to_show = random.sample(images_saved, 10)
    else:
        images_to_show = images_saved
    for i, img in enumerate(images_to_show):
        plt.subplot(2, 5, i + 1)
        plt.imshow(img)
        plt.axis('off')
    plt.show()
else:
    print('저장된 이미지가 없습니다.')

if search_words == "봄":
    # 이미지 저장 폴더 경로
    female_image_dir = 'Spring/Female'
    male_image_dir = 'Spring/Male'
elif search_words == "여름":
    # 이미지 저장 폴더 경로
    female_image_dir = 'Summer/Female'
    male_image_dir = 'Summer/Male'
elif search_words == "가을":
    # 이미지 저장 폴더 경로
    female_image_dir = 'Autumn/Female'
    male_image_dir = 'Autumn/Male'
elif search_words == "겨울":
    # 이미지 저장 폴더 경로
    female_image_dir = 'Winter/Female'
    male_image_dir = 'Winter/Male'

    female_image_files = os.listdir(female_image_dir)
    # 남성 이미지 파일 리스트
    male_image_files = os.listdir(male_image_dir)

    # 이미지 파일 중 5개씩 랜덤으로 선택
    if len(female_image_files) > 5:
        female_image_files = random.sample(female_image_files, 5)
    if len(male_image_files) > 5:
        male_image_files = random.sample(male_image_files, 5)

    # 이미지 출력
    plt.figure(figsize=(10, 4))
    for i, filename in enumerate(female_image_files):
        # 여성 이미지 파일 열기
        female_img_path = os.path.join(female_image_dir, filename)
        female_img = Image.open(female_img_path)

        # 여성 이미지 출력
        plt.subplot(2, 5, i + 1)
        plt.imshow(female_img)
        plt.axis('off')

    for i, filename in enumerate(male_image_files):
        # 남성 이미지 파일 열기
        male_img_path = os.path.join(male_image_dir, filename)
        male_img = Image.open(male_img_path)

        # 남성 이미지 출력
        plt.subplot(2, 5, i + 6)
        plt.imshow(male_img)
        plt.axis('off')
    plt.show()
else:
    print('검색어가 올바르지 않습니다.')
