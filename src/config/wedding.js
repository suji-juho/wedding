// 결혼식 정보 설정 파일
// 이 파일의 정보를 수정하면 청첩장 내용이 변경됩니다.

export const weddingConfig = {
  // 신랑 정보
  groom: {
    name: '이주호',
    phone: '', // 추후 입력
    father: { name: '이복수', alive: true },
    mother: { name: '최영순', alive: true },
    accounts: [
      { relation: '아버지', holder: '이복수', bank: '국민은행', number: '355-05-0002-446' },
      { relation: '어머니', holder: '최영순', bank: '국민은행', number: '038-21-1075-452' },
      { relation: '신랑', holder: '이주호', bank: '국민은행', number: '408801-01-303299' },
    ],
  },

  // 신부 정보
  bride: {
    name: '김수지',
    phone: '', // 추후 입력
    father: null, // 표기 안 함
    mother: { name: '설보경', alive: true },
    accounts: [
      { relation: '어머니', holder: '설보경', bank: '우체국', number: '014100-02-199182' },
      { relation: '신부', holder: '김수지', bank: '토스뱅크', number: '1000-0372-4840' },
    ],
  },

  // 결혼식 정보
  wedding: {
    date: '2026년 4월 11일',
    time: '오후 4시 50분',
    dayOfWeek: '토요일',
    dDay: new Date('2026-04-11T16:50:00'),
  },

  // 예식장 정보
  location: {
    name: '루이비스웨딩홀 중구점',
    hall: '',
    address: '서울시 중구 청파로 463, 한국경제신문사 18층',
    tel: '02-312-6800',
    coord: {
      lat: 37.560579961139815,
      lng: 126.96733309913476,
    },
    transportation: {
      shuttle: '서울역 하차 후 서부방면 롯데마트 앞에서 탑승 가능합니다.',
      shuttleImages: [
        '/wedding/shuttle/서울역 1,4호선 이용시.jpg',
        '/wedding/shuttle/서울역 ktx 이용시.jpg',
      ],
      subway: '2·5호선 충정로역 4번출구 도보 3분, 한국경제신문사 18F',
      car: '"한국경제신문사" 또는 주소 입력, 본 건물 지하 주차장 이용',
      bus: {
        blue: '370, 603, 172, 472, 700, 742, 271, 273, 600, 602',
        green: '7011, 7017, 7013, 1002',
        red: '(인천) 1000, 1100, 1101, 1200, 1300, 1301, 1302, 1400, 1500, 1601 / (김포) 1004, 8600, G6005, M6117',
      },
    },
  },

  // 인사말
  greeting: {
    title: '소중한 분들을 초대합니다',
    message: `우연처럼 시작된 인연이
필연이 되어 오늘에 닿았습니다.
두 사람이 하나의 길을 걷는 순간에
소중한 분들을 초대합니다.`,
  },

  // 갤러리 이미지 (public/images 폴더에 이미지 추가 후 경로 수정)
  gallery: [
    '/wedding/images/photo1.jpg',
    '/wedding/images/photo2.jpg',
    '/wedding/images/photo3.jpg',
    '/wedding/images/photo4.jpg',
    '/wedding/images/photo5.jpg',
    '/wedding/images/photo6.jpg',
    '/wedding/images/photo7.jpg',
    '/wedding/images/photo8.jpg',
    '/wedding/images/photo9.jpg',
    '/wedding/images/photo10.jpg',
    '/wedding/images/photo11.jpg',
    '/wedding/images/photo12.jpg',
    '/wedding/images/photo13.jpg',
    '/wedding/images/photo14.jpg',
    '/wedding/images/photo15.jpg',
  ],

  // 메인 이미지
  mainImage: '/wedding/images/main.jpg',
};
