# Project Plan: Code Masterpiece (Levelog)

**작성자**: 에이든 리 (Senior Product Strategist)
**문서 버전**: v1.0

---

## 1. 프로젝트 개요 (Project Overview)

### 1.1. 프로젝트 명
**Code Masterpiece**

### 1.2. 서비스 정의
디자이너와 개발자를 위한 **Levelog (Level up + Blog)** 플랫폼.
단순한 정보 전달을 넘어, 학습 행위 자체를 게임처럼 즐기며 성장하는 **Gamified Learning Community**입니다.

### 1.3. 프로젝트 목표 (Objectives)
*   **Motivation (동기 부여)**: 딱딱한 기술 지식을 '퀘스트'와 '보상'으로 치환하여, 학습의 진입 장벽을 낮추고 자발적 학습을 유도합니다.
*   **Retention (지속성)**: 일회성 방문이 아닌, 레벨업과 랭킹 시스템을 통해 사용자가 매일 방문하고 싶은 습관 형성(Hook Model)을 목표로 합니다.
*   **Authority & Bonding (전문성 및 유대감)**: 운영자의 노하우를 체계적으로 전달하여 신뢰를 구축하고, 사용자와 함께 성장하는 커뮤니티를 형성합니다.

---

## 2. 핵심 요구사항 (Core Requirements) - Zero-Ambiguity Spec

### 2.1. 계정 및 진행 상황 관리 (Account & Progress Tracking)
*   **User Story**: 방문자는 자신의 학습 기록을 저장하고 이어가기 위해 회원가입/로그인을 해야 한다.
*   **Spec Detail**:
    *   소셜 로그인(Google, GitHub) 지원으로 진입 장벽 최소화 (One-click Signup).
    *   로그인 시 대시보드 진입: 현재 레벨, 경험치 바(Progress Bar), 연속 학습일(Streak) 노출.
    *   **Edge Case**: 비로그인 상태에서 학습 진행 시, "로그인하여 기록 저장하기" 모달을 띄워 이탈 방지 및 가입 유도 (Progress Loss Aversion 심리 활용).

### 2.2. 활동 기반 보상 시스템 (Activity-Based Rewards)
*   **User Story**: 방문자는 글 읽기, 퀴즈 풀기 등의 활동을 통해 즉각적인 보상을 받아야 한다.
*   **Spec Detail**:
    *   **Read Action**: 포스트 스크롤 80% 이상 + 체류 시간 3분 이상 시 경험치(XP) +10 지급.
    *   **Quiz Action**: 포스트 하단 미니 퀴즈 정답 시 XP +20 및 '지식의 조각' 아이템 획득.
    *   **Interaction**: 댓글 작성 시 XP +5 (일일 최대 5회 제한으로 어뷰징 방지).
    *   **Feedback**: XP 획득 시 화면 상단에 토스트 메시지 및 미세한 진동(Haptic) 피드백 제공 (Mobile).

### 2.3. 마이페이지 및 시각화 (My Page & Visualization)
*   **User Story**: 방문자는 자신의 성장을 시각적으로 확인하고 남들에게 자랑할 수 있어야 한다.
*   **Spec Detail**:
    *   **Stat Radar Chart**: 학습 분야(Frontend, UX, Backend 등)별 능력치 그래프 시각화.
    *   **Badge Collection**: 획득한 배지를 그리드 형태로 전시 (미획득 배지는 실루엣 처리로 호기심 자극).
    *   **Ranking Board**: 주간/월간 랭킹 표시 (상위 10% 사용자에게 특별 테두리 제공).

---

## 3. 벤치마킹 (Benchmarking) - First-Principle Thinking

### 3.1. Duolingo (듀오링고)
*   **Pros (장점)**:
    *   **Streak (연속 학습)**: '불꽃' 아이콘을 지키기 위해 매일 접속하게 만드는 강력한 Lock-in 효과.
    *   **Micro-Learning**: 5분 내외의 짧은 호흡으로 부담 없이 시작 가능.
*   **Cons (단점)**:
    *   깊이 있는 이론 학습에는 한계가 있음 (반복 숙달 위주).
*   **Application (적용점)**:
    *   **Daily Quest**: "오늘의 아티클 1개 읽기"와 같은 가벼운 일일 목표 제시.
    *   **Streak System**: 연속 방문 시 경험치 보너스 배율 적용 (1일차 1.0x -> 7일차 1.5x).

### 3.2. Codecademy (코드카데미)
*   **Pros (장점)**:
    *   **Interactive Practice**: 이론 학습 후 바로 코드를 작성해보는 실습 환경.
    *   **Progress Tracking**: 커리큘럼 진행도를 명확하게 보여줌.
*   **Cons (단점)**:
    *   텍스트 양이 많아지면 지루해질 수 있음.
*   **Application (적용점)**:
    *   **Mini Quiz**: 긴 글 중간중간에 간단한 OX 퀴즈나 객관식 퀴즈를 삽입하여 환기(Refresh) 및 이해도 점검.

---

## 4. 타겟 설정 (Target Audience) - Data-Driven Persona

### 4.1. Primary Persona: "The Lost Junior"
*   **Demographics**: 20대 중반 ~ 30대 초반, 비전공자 출신 개발자 지망생 또는 1~2년차 주니어 디자이너/개발자.
*   **Pain Point**:
    *   "전공 서적은 수면제 같아요. 3페이지 읽으면 잠이 와요."
    *   "유튜브 강의는 보는데, 막상 다 보고 나면 남는 게 없는 것 같아요."
    *   "무엇부터 공부해야 할지 로드맵이 안 보여요."
*   **Needs**:
    *   **Curated Path**: 떠먹여 주는 체계적인 학습 순서.
    *   **Instant Gratification**: 작은 성취에도 즉각적인 칭찬과 보상.
    *   **Bite-sized Content**: 출퇴근길 지하철에서 가볍게 읽을 수 있는 분량.

---

## 5. 콘텐츠 및 서비스 전략 (Content & Service Strategy)

### 5.1. 퀘스트 및 배지 시스템 (Quest & Badge System)
*   **Goal**: 사용자의 행동을 특정 방향(학습 완료, 커뮤니티 참여)으로 유도(Nudge).
*   **Implementation**:
    *   **Tutorial Quest**: "첫 번째 글 읽기", "프로필 설정하기" 등 온보딩 퀘스트로 초기 이탈 방지.
    *   **Hidden Badge**: "이스터 에그 발견(특정 키워드 검색)", "새벽 3시에 공부 중(올빼미 배지)" 등 재미 요소 추가.
    *   **Collection Effect**: 배지 획득 시 화려한 모달 애니메이션(Lottie)으로 도파민 자극.

### 5.2. 경험치(XP) 및 레벨 시스템 (XP & Level System)
*   **Goal**: 사용자의 성취감을 정량화하고, 고레벨 달성 욕구 자극.
*   **Implementation**:
    *   **Level Scaling**: 초기 레벨업은 매우 빠르게(1->2레벨: 글 1개), 후반부는 어렵게 설계하여 초반 몰입도 증대.
    *   **Unlock Content**: 특정 레벨 도달 시에만 열람 가능한 '심화 콘텐츠' 또는 '프리미엄 자료' 제공 (Locking Strategy).
    *   **Title System**: 레벨에 따라 칭호 부여 (예: `Lv.1 코딩 병아리` -> `Lv.10 버그 사냥꾼` -> `Lv.99 코드 마스터`).

### 5.3. 사용자 유지 및 커뮤니티 형성 (Retention & Community)
*   **Goal**: 혼자 하는 공부가 아닌 '함께 하는' 느낌을 주어 이탈 방지.
*   **Implementation**:
    *   **Weekly Leaderboard**: 주간 획득 XP 기준 상위 3명 메인 페이지 노출.
    *   **Comment Badge**: 베스트 댓글 선정 시 추가 XP 지급 및 댓글창 상단 고정.
    *   **Study Group Challenge**: (추후 고도화) 친구와 함께 목표 달성 시 보너스 지급 기능.

---
**Note**: 본 기획서는 개발팀(제이든)과 디자인팀(소피아)의 검토를 거쳐 상세 스펙(API 명세, UI 디자인)으로 구체화될 예정입니다.
