<a href="https://busking-web.vercel.app">https://busking-web.vercel.app</a>

<a href="https://busking-admin.vercel.app">https://busking-admin.vercel.app</a>


# 노래 버스킹 관리 시스템 🎵

간단하게 만든 노래 버스킹을 위한 신청곡 관리 시스템입니다. 관객들이 노래를 신청하고, 관리자가 이를 효율적으로 관리할 수 있는 웹 애플리케이션입니다.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)

## 📋 목차

- [🏗️ 프로젝트 구조](#️-프로젝트-구조)
- [✨ 기능 소개](#-기능-소개)
- [🛠️ 기술 스택](#️-기술-스택)
- [🚀 설치 및 실행](#-설치-및-실행)
- [⚙️ 환경 설정](#️-환경-설정)
- [📖 사용법](#-사용법)
- [🔧 개발](#-개발)
- [🤝 기여](#-기여)
- [📝 라이센스](#-라이센스)
- [📞 문의](#-문의)

## 🏗️ 프로젝트 구조

이 프로젝트는 **Turborepo**를 사용한 모노레포 구조입니다.

```
📦 busking-management
├── 📁 apps/
│   ├── 📁 admin/          # 관리자 페이지
│   └── 📁 web/            # 사용자 페이지
├── 📁 packages/
│   ├── 📁 ui/             # 공유 UI 컴포넌트
│   ├── 📁 eslint-config/  # ESLint 설정
│   └── 📁 typescript-config/ # TypeScript 설정
└── 📄 README.md
```

## ✨ 기능 소개

### 🎤 사용자 페이지 (`/apps/web`)

- **스플래시 스크린**: 브랜드 로고와 함께 앱 로딩
- **신청곡 목록**: 현재 신청된 곡들을 실시간으로 확인
- **노래 신청**: 간편한 모달 폼으로 노래 신청
- **후원 정보**: 카카오뱅크 계좌 정보 표시
- **소셜 링크**: Instagram, YouTube 링크

### 👑 관리자 페이지 (`/apps/admin`)

- **드래그 앤 드롭**: 직관적인 순서 변경
- **신청곡 관리**: 개별 수정, 삭제, 일괄 관리
- **연주 가능 여부**: 곡별 연주 가능 상태 관리
- **보컬 지정**: 각 곡에 대한 보컬 담당자 지정
- **실시간 업데이트**: 최신 신청곡 상태 반영

## 🛠️ 기술 스택

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Drag & Drop**: @dnd-kit
- **State Management**: React Hooks

### Backend & Database

- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Real-time subscriptions
- **Authentication**: Supabase Auth (필요시)

### Development Tools

- **Monorepo**: Turborepo
- **Package Manager**: npm/pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 🚀 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd busking-management
```

### 2. 의존성 설치

```bash
# 루트에서 모든 패키지 설치
npm install

# 또는 pnpm 사용
pnpm install
```

### 3. 환경 변수 설정

각 앱에 `.env.local` 파일을 생성하고 설정:

**`apps/web/.env.local`**

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**`apps/admin/.env.local`**

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 데이터베이스 스키마 설정

Supabase에서 다음 테이블을 생성:

```sql
CREATE TABLE setLists (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    singer TEXT NOT NULL,
    spotifyURL TEXT,
    "order" INTEGER DEFAULT 0,
    isAvaible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    vocal TEXT
);
```

### 5. 애플리케이션 실행

**개발 모드**

```bash
# 모든 앱 동시 실행
npm run dev

# 개별 앱 실행
npm run dev --filter=web      # 사용자 페이지
npm run dev --filter=admin    # 관리자 페이지
```

**프로덕션 빌드**

```bash
# 모든 앱 빌드
npm run build

# 개별 앱 빌드
npm run build --filter=web
npm run build --filter=admin
```

## ⚙️ 환경 설정

### Supabase 설정

1. Supabase에서 새 프로젝트 생성
2. 데이터베이스 테이블 생성 (위 스키마 참조)
3. API 키 및 URL을 환경 변수에 설정

### 도메인 및 배포

- **사용자 페이지**: 모바일 최적화, 반응형 디자인
- **관리자 페이지**: 데스크톱 환경 권장

## 📖 사용법

### 사용자 (관객)

1. 웹사이트 접속
2. 스플래시 화면 후 자동으로 메인 페이지 이동
3. 현재 신청곡 목록 확인
4. "노래 신청하기" 버튼으로 신청 모달 열기
5. 신청자 정보, 곡명, 가수명 입력 후 제출

### 관리자

1. 어드민 페이지 접속
2. 신청곡 목록에서 드래그로 순서 변경
3. 연필 아이콘으로 곡 정보 수정
4. 연주 가능 여부 및 보컬 지정 관리
5. 필요시 곡 삭제 또는 일괄 관리

## 🔧 개발

### 새 컴포넌트 추가

```bash
# UI 패키지에 컴포넌트 추가
cd packages/ui

# shadcn/ui 컴포넌트 추가 예시
npx shadcn-ui@latest add button
```

### 코드 품질

```bash
# 린팅
npm run lint

# 타입 체크
npm run typecheck

# 린트 자동 수정
npm run lint:fix
```

### 패키지 구조

- `packages/ui`: 공용 UI 컴포넌트 및 스타일
- `packages/eslint-config`: ESLint 설정
- `packages/typescript-config`: TypeScript 설정

## 📷 스크린샷

### 사용자 페이지

- 스플래시 화면
- 신청곡 목록
- 신청 모달

### 관리자 페이지

- 드래그 앤 드롭 인터페이스
- 곡 정보 수정
- 일괄 관리 기능

## 🤝 기여

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 라이센스

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**Team Noname** 🎵

- Instagram: [@bk.noname\_](https://instagram.com/bk.noname_)
- YouTube: [@joinscvable](https://youtube.com/@joinscvable)
