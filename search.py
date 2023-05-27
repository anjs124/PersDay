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
import datetime

current_dir = os.getcwd()
seasons = ['봄웜톤', '여름쿨톤', '가을웜톤', '겨울쿨톤']
tones = {
    '봄웜톤': ['황토', '연두', '라임그린', '연분홍', '노란'],
    '여름쿨톤': ['연한 회색', '청록', '분홍', '보라', '파란'],
    '가을웜톤': ['노란갈색', '주황', '황금', '갈색', '녹색'],
    '겨울쿨톤': ['검정', '하얀', '분홍', '블루', '레드']
}
search_words = input('봄웜톤, 여름쿨톤, 가을웜톤, 겨울쿨톤 중 어느 톤의 옷을 검색하시겠습니까? ')


# 현재 날짜로 계절 구하기
current_date = datetime.date.today()
current_month = current_date.month




# 사용자가 입력한 시즌에 해당하는 검색어들 받아오기
if search_words in seasons:
    search_word_list = tones[search_words]
    
else:
    print('봄, 여름, 가을, 겨울 중에서만 입력해주세요.')
    exit()

# 이미지를 저장할 폴더 경로 받아오기
save_dir = os.path.join(current_dir, 'PersDay', 'static', 'uploads')

# 폴더가 존재하지 않는 경우 생성
if not os.path.exists(save_dir):
    os.makedirs(save_dir)

# 시즌에 따른 폴더명 지정
if search_words == '봄웜톤':
    folder_name = 'Spring Warm'

elif search_words == '여름쿨톤':
    folder_name = 'Summer Cool'
elif search_words == '가을웜톤':
    folder_name = 'Autumn Warm'
elif search_words == '겨울쿨톤':
    folder_name = 'Winter Cool'

save_dir = os.path.join(save_dir, folder_name)

# 사용자가 입력한 계절에 해당하는 톤과 폴더 선택
if current_month in [3, 4, 5]:  # 봄
    season='봄'
    folder = '봄'
elif current_month in [6, 7, 8]:  # 여름
    season='여름'
    folder = '여름'
elif current_month in [9, 10, 11]:  # 가을
    season='가을'
    folder = '가을'
else:  # 겨울
    season='겨울'
    folder = '겨울'
# 이미지 저장 경로에 폴더명 추가

save_dir = os.path.join(save_dir, folder)
# 폴더가 존재하지 않는 경우 생성
if not os.path.exists(save_dir):
    os.makedirs(save_dir)

# 이미지 저장 리스트
images_saved = []
for i, search_word in enumerate(search_word_list):
    # URL을 요청하고 HTML 가져오기
    url = f'https://www.musinsa.com/search/musinsa/integration?q={search_word}+{season}+코디&type=popular'
    response = requests.get(url)
    html_content = response.content

    # BeautifulSoup 객체 생성
    soup = BeautifulSoup(html_content, 'html.parser')

    images = soup.find_all('img', class_='lazyload')
    filtered_images = [img for img in images if 'lazy' not in img.get('class', [])]
    complete_urls = ['https:' + img['src'] for img in filtered_images]
    complete_urls = [url for url in complete_urls if 'lookbook' and 'list' not in url]

    print(complete_urls)
    print(url)
    
    # 이미지 다운로드 및 저장
    if complete_urls:
        for idx, img_url in enumerate(complete_urls):
            # 이미지 다운로드
            img_data = requests.get(img_url).content

            # 이미지 저장
            filename = f"example{i}_{idx+1}.jpg"
            filepath = os.path.join(save_dir, filename)

            # 이미지 열기
            img = Image.open(BytesIO(img_data))

            # 이미지 모드가 LA인 경우 RGB로 변환
            if img.mode == 'LA':
                img = img.convert('RGB')

            # 이미지 저장
            img.save(filepath)
            print(f'{filepath} 이미지를 저장했습니다.')
            images_saved.append(img)
    else:
        print(f'{search_word}에 대한 이미지를 찾을 수 없습니다.')

# # 이미지 출력
# n_images_saved = len(images_saved)
# if n_images_saved > 0:
#     if n_images_saved > 10:
#         images_to_show = random.sample(images_saved, 10)
#     else:
#         images_to_show = images_saved
#     for i, img in enumerate(images_to_show):
#         plt.subplot(2, 5, i + 1)
#         plt.imshow(img)
#         plt.axis('off')
#     plt.show()
# else:
#     print('저장된 이미지가 없습니다.')



