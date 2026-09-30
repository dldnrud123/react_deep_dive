import React, { useState, useEffect } from 'react';

// 가상 소켓 객체 모의 구현 (실제 new WebSocket과 동일한 라이프사이클)
class MockWebSocket {
  constructor(url) {
    this.url = url;
    console.log(`🔌 [Mock 소켓] 서버(${url})와 TCP 파이프 연결 수립`);
    
    // 서버에서 1초마다 실시간 시세를 밀어주는 상황 모의
    this.timer = setInterval(() => {
      if (this.onmessage) {
        this.onmessage({ data: Math.floor(Math.random() * 1000) });
      }
    }, 1000);
  }

  close() {
    clearInterval(this.timer);
    console.log(`❌ [Mock 소켓] 서버(${this.url}) 커넥션 파기 완료 (세션 반납)`);
  }
}

function StockPriceViewer({ symbol }) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // 1. 컴포넌트가 켜지거나 종목(symbol)이 바뀌면 소켓 생성
    const socket = new MockWebSocket(`wss://mock.crypto.com/ws/${symbol}`);

    socket.onmessage = (event) => {
      setPrice(event.data);
    };

    // 2. 종목이 바뀌거나 창을 닫을 때 이전 파이프를 반드시 끊어줌
    // return () => {
    //   socket.close();
    // };
  }, [symbol]);

  return (
    <div>
      <h3>현재 종목: {symbol}</h3>
      <p>실시간 수신 가격: {price}</p>
    </div>
  );
}

export default function SocketExperiment() {
  const [stock, setStock] = useState('BTC');
  const [mounted, setMounted] = useState(true);

  return (
    <div>
      <button onClick={() => setMounted(prev => !prev)}>
        {mounted ? '화면 끄기 (언마운트)' : '화면 켜기 (마운트)'}
      </button>
      <button onClick={() => setStock('BTC')}>BTC 보기</button>
      <button onClick={() => setStock('ETH')}>ETH 보기</button>
      <hr />
      {mounted && <StockPriceViewer symbol={stock} />}
    </div>
  );
}