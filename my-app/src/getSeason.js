export function getSeason() {
    const date = new Date();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
  
    if (month >= 3 && month <= 5) {
      return "봄";
    } else if (month >= 6 && month <= 8) {
      return "여름";
    } else if (month >= 9 && month <= 11) {
      return "가을";
    } else {
      return "겨울";
    }
  }