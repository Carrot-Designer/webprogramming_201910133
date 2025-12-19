# Design System: Code Masterpiece

**작성자**: 소피아 첸 (Principal Product Designer)
**문서 버전**: v1.0

---

## 1. 디자인 철학 (Design Philosophy)
**"Extreme Minimalism & Cognitive Ease"**
불필요한 장식을 배제하고, 오직 타이포그래피와 여백, 그리고 명확한 그리드 시스템을 통해 정보의 본질을 전달합니다. 사용자의 인지 부하를 최소화하여 학습과 성장에 온전히 집중할 수 있는 환경을 제공합니다.

---

## 2. 타이포그래피 (Typography)

### 2.1. 서체 (Font Family)
*   **Korean**: `Noto Sans KR` (가독성과 범용성이 뛰어난 고딕 계열)
*   **English / Numbers**: `Univers` (스위스 스타일의 정수, 중립적이고 모던한 산세리프)
*   **Code**: `JetBrains Mono` (개발자 친화적인 고정폭 서체)

### 2.2. 스케일 및 위계 (Type Scale & Hierarchy)
가독성을 위해 본문은 `Regular` 이하, 제목 및 강조 텍스트는 `Medium` 이상을 사용합니다.

| Role | Element | Font Size (px/rem) | Line Height | Letter Spacing | Weight |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | H1 (Hero Title) | 48px / 3.0rem | 120% (57.6px) | -0.02em | Bold (700) |
| **Heading** | H2 (Section Title) | 32px / 2.0rem | 130% (41.6px) | -0.01em | Bold (700) |
| **Heading** | H3 (Card Title) | 24px / 1.5rem | 140% (33.6px) | 0 | Medium (500) |
| **Body** | Body 1 (Main Text) | 16px / 1.0rem | 160% (25.6px) | 0 | Regular (400) |
| **Body** | Body 2 (Sub Text) | 14px / 0.875rem | 150% (21px) | 0 | Regular (400) |
| **Caption** | Caption / Label | 12px / 0.75rem | 140% (16.8px) | 0.02em | Medium (500) |

---

## 3. 컬러 시스템 (Color System)

### 3.1. 무채색 (Grayscale) - The Foundation
미니멀리즘의 핵심인 무채색 팔레트는 콘텐츠의 배경이 되어주며, 눈의 피로를 줄여줍니다.

| Token | Hex Code | Usage |
| :--- | :--- | :--- |
| `Gray-900` | `#111111` | Primary Text (본문, 제목) |
| `Gray-700` | `#424242` | Secondary Text (부가 설명) |
| `Gray-500` | `#9E9E9E` | Disabled Text, Placeholder |
| `Gray-300` | `#E0E0E0` | Borders, Dividers |
| `Gray-100` | `#F5F5F5` | Background (Section) |
| `White` | `#FFFFFF` | Background (Card, Modal) |

### 3.2. 포인트 컬러 (Accent Color) - The Spark
학습 동기 부여와 게이미피케이션 요소(XP, 레벨업)에 생동감을 불어넣는 포인트 컬러입니다.

| Token | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary Blue** | `#0052CC` | CTA Buttons, Links, Active States (신뢰, 지성) |
| **Success Green** | `#00C853` | Level Up, Quest Complete, Correct Answer (성장, 완료) |
| **Warning Orange** | `#FFAB00` | Streak (Fire), Important Notice (주목, 활력) |
| **Error Red** | `#D50000` | Validation Error, Delete Action (경고) |

---

## 4. 그리드 시스템 (Grid System)

### 4.1. 데스크탑 그리드 (Desktop Grid)
안정적이고 균형 잡힌 레이아웃을 위해 12 컬럼 그리드를 사용합니다. 전체 너비 1340px을 기준으로 소수점 없이 딱 떨어지는 수치를 설정했습니다.

*   **Total Width**: `1340px` (Container Max-width)
*   **Columns**: `12`
*   **Gutter**: `20px` (컬럼 사이 간격)
*   **Column Width**: `93.33px` (X) -> **`90px`** (조정값)
    *   *Calculation*: (90px * 12 cols) + (20px * 11 gutters) = 1080px + 220px = 1300px.
    *   *Margin*: 좌우 각각 `20px`.
    *   *Total*: 1300px + 40px = 1340px.

**[Grid Specification]**
*   **Container**: `1340px` (Centered)
*   **Column Count**: `12`
*   **Column Width**: `90px`
*   **Gutter Width**: `20px`
*   **Side Margin**: `20px` (Container 내부 좌우 여백)

### 4.2. 반응형 전략 (Responsive Strategy)
*   **Tablet (768px ~ 1023px)**: 8 Columns, Fluid Width, 20px Gutter
*   **Mobile (320px ~ 767px)**: 4 Columns, Fluid Width, 16px Gutter, 16px Margin

---

## 5. 컴포넌트 가이드 (Component Guidelines)

### 5.1. 버튼 (Buttons)
*   **Shape**: `Border-radius: 4px` (단단하고 명확한 느낌)
*   **Height**: `48px` (Large), `40px` (Medium), `32px` (Small)
*   **Padding**: 좌우 `24px` (Large 기준)

### 5.2. 카드 (Cards)
*   **Style**: `Border: 1px solid Gray-300`, `Background: White`
*   **Shadow**: 없음 (Flat Design 지향). Hover 시에만 미세한 `Translate Y -2px` 효과 적용.
*   **Spacing**: 내부 Padding `24px` 통일.

### 5.3. 아이콘 (Iconography)
*   **Style**: Line Icon (Stroke Width 1.5px ~ 2px)
*   **Color**: `Gray-900` (Default), `Primary Blue` (Active)
*   **Size**: `24x24` (Standard)
