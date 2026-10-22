# Vantage Tactics

[게임 실행](https://etin94-prog.github.io/vantage-tactics/) · [전술 실험실](https://etin94-prog.github.io/vantage-tactics/lab.html) · [검증 키트 ZIP](https://etin94-prog.github.io/vantage-tactics/review-kit.zip)

V2 숫자 데이터 기반 30개 고정 맵, 시작 위치, 27종 마스터, 24종 정령과 고유 마법·성장·주야간·이동 취소를 구현 중입니다. 원작의 모든 피해 계수와 보상 규칙까지 일치하는 빌드는 아닙니다. [복원 현황](RESTORATION_STATUS.md)을 확인하세요.

실험실은 일반 원정 저장과 분리되며, 수동 양 팀 행동·좌표 명령·AI 단계 실행·35개 자동 실험·JSON 재현·리뷰 내보내기를 지원합니다. [Codex·Claude 공통 가이드](LAB_REVIEW_GUIDE.md)를 먼저 읽으세요. ZIP에는 실행 가능한 소스·테스트·예시 JSON과 SHA-256 목록이 포함됩니다.

2026-10-23 실험실 배포: 기본 테스트 40개, 자동 실험 35개 통과. 시전자 사망 후 턴 정지·석화 반격·잘못된 상태이상 저장 수용을 수정했습니다. 테스트 통과는 원작 일치율이나 캠페인 밸런스 보증이 아닙니다.

일반 게임에서는 이동 후 '이동 취소'(Z)를 누르세요. 공격·소환·마법·대기 확정 후에는 취소할 수 없습니다. v4 전투 저장, v3 원정 기록을 사용합니다. 저장은 기기·브라우저별로 분리됩니다.

배포 HTML과 검증 키트에 원본 실행 파일·아트·음원은 포함하지 않습니다.
