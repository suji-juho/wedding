import { useEffect, useRef } from 'react';
import { weddingConfig } from '../config/wedding';

function Location() {
  const { location } = weddingConfig;
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(location.coord.lat, location.coord.lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      // 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(location.coord.lat, location.coord.lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 인포윈도우 추가
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${location.name}</div>`,
      });
      infowindow.open(map, marker);
    }
  }, [location.coord.lat, location.coord.lng, location.name]);

  const openNaverMap = () => {
    window.open(
      `https://map.naver.com/v5/search/${encodeURIComponent('루이비스웨딩홀 중구점')}`,
      '_blank'
    );
  };

  const openKakaoNavi = () => {
    window.open(
      `https://map.kakao.com/link/to/${encodeURIComponent('루이비스웨딩홀 중구점')},${location.coord.lat},${location.coord.lng}`,
      '_blank'
    );
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('루이비스웨딩홀 중구점');
    alert('복사되었습니다.');
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-md mx-auto">
        <h2 className="font-serif text-2xl text-primary text-center mb-8">오시는 길</h2>

        {/* 예식장 정보 */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-800">{location.name}</h3>
          {location.hall && <p className="text-primary">{location.hall}</p>}
          <p className="text-gray-600 text-sm mt-2">{location.address}</p>
          <p className="text-gray-500 text-sm">Tel. {location.tel}</p>
        </div>

        {/* 카카오맵 */}
        <div
          ref={mapRef}
          className="rounded-lg h-64 mb-4"
          style={{ width: '100%' }}
        />

        {/* 지도 앱 버튼 */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          <button
            onClick={openNaverMap}
            className="py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition"
          >
            네이버지도
          </button>
          <button
            onClick={openKakaoNavi}
            className="py-3 bg-yellow-400 text-gray-800 rounded-lg text-sm font-medium hover:bg-yellow-500 transition"
          >
            카카오내비
          </button>
          <button
            onClick={copyAddress}
            className="py-3 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
          >
            복사하기
          </button>
        </div>

        {/* 교통 안내 */}
        <div className="space-y-4 text-sm">
          <div className="bg-secondary/30 rounded-lg p-4">
            <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
              <span>🚐</span> 셔틀버스
            </h4>
            <p className="text-gray-600">{location.transportation.shuttle}</p>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4">
            <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
              <span>🚇</span> 지하철
            </h4>
            <p className="text-gray-600">{location.transportation.subway}</p>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4">
            <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
              <span>🚗</span> 자가용
            </h4>
            <p className="text-gray-600">{location.transportation.car}</p>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4">
            <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
              <span>🚌</span> 버스
            </h4>
            <p className="text-gray-500 text-xs mb-1">※ 한국경제신문사, 충정로역 하차</p>
            <div className="space-y-1 text-gray-600">
              <p><span className="text-blue-500 font-medium">간선</span> {location.transportation.bus.blue}</p>
              <p><span className="text-green-500 font-medium">지선</span> {location.transportation.bus.green}</p>
              <p><span className="text-red-500 font-medium">광역</span> {location.transportation.bus.red}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
