# React + Styled Components 프로젝트

이 프로젝트는 React와 Styled Components를 사용하여 구축된 웹 애플리케이션입니다.

## 🚀 기술 스택

- **React** 19.1.0 - 사용자 인터페이스 구축을 위한 JavaScript 라이브러리
- **Styled Components** 6.1.19 - CSS-in-JS 라이브러리
- **React Scripts** 5.0.1 - React 개발 도구

## 📁 프로젝트 구조

```
src/
  ├── components/
  │   ├── Button.js      # 재사용 가능한 버튼 컴포넌트
  │   └── Card.js        # 카드 컴포넌트
  ├── App.js             # 메인 앱 컴포넌트
  └── index.js           # 애플리케이션 진입점
```

## 🎯 주요 기능

### Styled Components 사용법
- **기본 스타일링**: CSS-in-JS 방식으로 컴포넌트에 스타일 적용
- **동적 스타일링**: Props를 이용한 조건부 스타일링
- **애니메이션**: keyframes를 사용한 CSS 애니메이션
- **호버 효과**: :hover, :active 등의 pseudo-class 사용

### 예제 컴포넌트
1. **Button 컴포넌트**
   - Primary/Secondary 스타일
   - 호버 효과와 애니메이션
   - 비활성화 상태 지원

2. **Card 컴포넌트**
   - 그림자 효과
   - 호버 시 transform 애니메이션
   - 제목과 내용 구분

## 🛠️ 설치 및 실행

### 필요 조건
- Node.js (14.0 이상)
- npm 또는 yarn

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm start
```
브라우저가 자동으로 열리며 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 빌드
```bash
npm run build
```
production용 빌드 파일이 `build` 폴더에 생성됩니다.

### 테스트
```bash
npm test
```

## 📚 Styled Components 사용 예시

### 기본 스타일링
```javascript
import styled from 'styled-components';

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
```

### Props 기반 동적 스타일링
```javascript
const Button = styled.button`
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  
  &:hover {
    background-color: ${props => props.primary ? '#0056b3' : '#5a6268'};
  }
`;
```

### 애니메이션
```javascript
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const RotatingDiv = styled.div`
  animation: ${rotate} 2s linear infinite;
`;
```

## 🔧 추가 설정

### VS Code 확장 추천
- **vscode-styled-components**: Styled Components 문법 하이라이팅
- **ES7+ React/Redux/React-Native snippets**: React 스니펫

### 유용한 패키지
```bash
# 추가 설치 시 고려할 패키지들
npm install polished          # CSS 헬퍼 함수
npm install @types/styled-components  # TypeScript 타입 정의
```

## 📖 참고 자료

- [React 공식 문서](https://reactjs.org/)
- [Styled Components 공식 문서](https://styled-components.com/)
- [Create React App](https://create-react-app.dev/)

## 🤝 기여하기

1. 이 저장소를 Fork 하세요
2. 새로운 기능 브랜치를 생성하세요 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성하세요

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
