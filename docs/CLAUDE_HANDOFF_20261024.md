# Vantage Tactics · Claude 작업 인계 · 2026-10-24

## 시작점

모바일 중심의 밴티지 마스터 재현 프로젝트다. 사용자는 맵·시작 위치·스탯이 전략에 직접 영향을 주므로 정확한 원작 근거를 우선하며, 첫 번째 유튜브 플레이 판본을 기준으로 선택했다. 현재 작업은 모바일 전투 가독성 개선 이후 발견된 타격음·소리 유지 문제의 수정이다.

- 게임: https://etin94-prog.github.io/vantage-tactics/
- 실험실: https://etin94-prog.github.io/vantage-tactics/lab.html
- 최신 소스·테스트 ZIP: https://etin94-prog.github.io/vantage-tactics/review-kit.zip
- 파일 해시: https://etin94-prog.github.io/vantage-tactics/review-kit-manifest.json
- 저장소: https://github.com/etin94-prog/vantage-tactics
- 배포 기록: https://github.com/etin94-prog/vantage-tactics/actions
- 이번 배포 커밋 제목: `Persist sound preferences and play combat effects on impact`
- 직전 공개 커밋: `5d8dc166efa1cca53963b4bfbc4cd8e560c4ac7e` (이번 소리 수정은 미포함).

이번 소리 수정의 완료 커밋 SHA와 Pages 결과는 Codex의 최종 메시지 또는 위 Actions에서 확인한다. 문서 안에 자기 자신의 커밋 SHA를 고정하지 않는다. 파일 버전 판별에는 ZIP의 manifest와 다운로드한 파일의 SHA-256을 비교한다. LAB_BUILD `592b1da13932001f2ac01f1ed168d025947ec5e5af2659175ffd68232b69b0d9`는 audio.js/main.js 변경을 포함하지 않아 이번 소리 수정 전후에도 같다.

## 작업 폴더와 배포 구조

Windows 개발 원본은 `C:\VantageTactics`다. 이 폴더 자체에는 Git 저장소가 없다. 배포용 Git 체크아웃은 `C:\VantageTactics\test-results\deploy-media-01a16741`이며 origin/main을 사용한다.

| 개발 폴더 | 배포 저장소 | 의미 |
| --- | --- | --- |
| index.html + src/ | review-kit.zip 내부에 포함 | 수정할 개발 소스 |
| play.html | index.html | 빌드된 공개 게임 |
| lab.html | lab.html | 빌드된 실험실 |
| assets/reference-media.js | 동일 경로 | 공용 도트·음원 데이터 |
| review-kit.zip / review-kit-manifest.json | 동일 경로 | 다른 세션용 전체 소스 스냅샷 |
| docs/ | 선정된 문서만 복사 | 전부 자동 동기화되지 않음 |

다른 컴퓨터의 Claude는 저장소만 clone하면 개발용 src/가 없을 수 있다. 최신 review-kit.zip을 **새 빈 작업 폴더**에 풀어 작업한다. 기존 작업 폴더에 통째로 덮어쓰지 말고 변경점을 비교한다. 개발용 index.html로 배포용 index.html을 덮어쓰면 안 된다. 공개 게임은 play.html을 index.html로 복사한 것이다.

## 먼저 읽을 자료

아래 경로는 개발 폴더 또는 ZIP을 푼 폴더 기준이다.

1. `docs/MOBILE_UI.md`: 최신 모바일 UI·연출·진동·오디오 수정 이력. 뒤쪽의 최신 항목이 과거 타이밍 설명을 대체한다.
2. `docs/V2_RESTORATION_STATUS.md`: 원작에서 확인한 부분과 아직 임시인 부분.
3. `docs/EXE_STATIC_ANALYSIS.md`: 실행 파일 정적 분석 근거, 함수 주소 및 재현 명령. 원본 EXE/DAT는 키트에 없다.
4. `docs/LAB_REVIEW_GUIDE.md`: 실험실 및 재현 JSON 사용법. 문서 끝의 과거 '리뷰만 수행' 프롬프트는 과거 작업용이다. 이번 구현 인계에는 아래 프롬프트를 사용한다.
5. `docs/REFERENCE_MEDIA.md`, `docs/reference-media-manifest.json`: 미디어 출처·변환 범위.
6. `docs/reviews/claude-20261023-c5a9e2-audio-effects.md`, 같은 이름의 `.codex-handoff.md`: Claude 오디오 리뷰 원본.
7. `docs/reviews/codex-20261023-c5a9e2-audio-effects-response.md`: 그 리뷰에 대한 기존 수정 결과. 이후 소리 유지 수정은 MOBILE_UI 최신 항목과 이번 소스를 기준으로 한다.
8. `docs/reviews/strategy-baseline-2026-10-23.md`와 `.json`: 과거 전략 AI 측정 결과. 현재 빌드의 승률이 아니다.

원작 레퍼런스:

- 공식 매뉴얼: https://www.falcom.co.jp/vantage/manual/
- 사용자 선택 영상: https://www.youtube.com/watch?v=irDM3getf_0&list=PLF-OAenTW0BmLg6FfTCKqV4lyZGMbBPIJ&index=1
- 보조 영상: https://www.youtube.com/watch?v=NZ7Gq7CObI4&list=PL-yKcVzdSM1_MnO-0KA_cIZcURfTHPOaj

로컬의 VANTAGE_MASTER_DEV_GUIDE/GDD/MAPS 문서는 초기 기획 자료다. 오래된 '95% 완성', '모든 규칙 완벽' 주장보다 복원 현황과 정적 분석 문서를 우선한다. 이 인계에서 영상 전편을 다시 검증한 것은 아니다.

## 최근 반영 사항

- 내 차례인 실제 행동 유닛: 링·화살표·내 차례 라벨. 다른 유닛을 관찰해도 유지한다. 이동 후 행동 선택으로 바뀐다.
- HP 중복 표기 제거, 피해/반격 숫자와 HP 충돌 회피. 매우 밀집한 곳은 일부 배지를 생략하고 상세 패널로 확인한다.
- 실제 이동 경로를 따라 보간한다. 포탈·빙판·이동 취소 경로를 포함한다. 적 행동 전 카메라가 적을 따라가며, 시야 밖 적은 추적하지 않는다.
- 연출 속도 0.75/1/2/3배, 기본1배. 이동 뒤 공격 타격300ms, 반격 모션800ms, 반격 타격1100ms. 원작 추출값이 아닌 웹 연출 값이다. 엔진 계산과 화면 재생을 분리한다.
- 타격 진동 설정과 미지원 처리. 실제 휴대폰 진동은 미검증이다.
- 이번 수정: `preferences.soundEnabled`로 켜기/끄기 저장. 새로고침 이후 첫 터치/키 입력으로 재생한다. 화면 복귀 실패나 곡 로딩 실패가 사용자 켜짐 의도를 지우지 않는다.
- 새 악보 로딩 성공 후 곡 교체, 동일 곡 재시작 방지, 로딩 실패 시 이전 곡 유지. BGM 교체와 효과음 취소 토큰을 분리한다.
- `presentationSound()`로 공격/반격 피해 시점에 타격음 연결. 공격 준비 모션에서는 재생하지 않는다. 0피해도 접촉음이 있다. 공격 트림 -10→-6dB, 사용자의 효과음 슬라이더0은 유지한다.

## 소스 길잡이

| 파일 | 담당 |
| --- | --- |
| src/main.js | 화면·전투 연결, AI 실행 대기, 설정 저장, 오디오 재개 입력 |
| src/audio.js | MIDI 파싱·합성, BGM·SFX, 켜짐 의도와 재생 수명 관리 |
| src/presentation.js | 이동→공격→반격 일정, 경로 보간, 라벨 충돌 회피 |
| src/renderer.js | Canvas·카메라·HP·현재 행동 강조, 프레임 정체 보정 |
| src/haptics.js | 진동 요청·중복 제한·미지원 처리 |
| src/engine.js, rules.js, spells.js | 전투 판정과 상태 변경. 연출 문제 때문에 원작 규칙을 바꾸지 않는다 |
| src/v2-reference.js, maps.js | 추출 수치 및 원본 맵 변환 |
| src/strategy-lab.js, strategy-ui.js | 전략 AI 측정 |
| tests/audio.test.js, presentation.test.js, haptics.test.js | 최근 변경의 회귀 검사 |

## 실행·검증

Node.js20 이상, 외부 npm 의존성 없음. 키트 생성에 Python3 사용.

```text
npm test
npm run check
npm run lab:test
npm run build
python scripts/package-review-kit.py
npm start
```

기본 서버는 http://127.0.0.1:4173/ 이며 실험실은 /lab.html 이다. 기존 서버가 있으면 다른 포트를 사용한다(Windows PowerShell: `$env:PORT=4182; npm start`, Linux: `PORT=4182 npm start`). 기존 사용자 탭과 저장 데이터를 덮어쓰지 않는다.

이번 기준: 자동 테스트107개, 실험실35개. 실험실은 30개 캠페인 완주 검증이 아니라 짧은 회귀 실험이다. 브라우저에서 1→2→3 전장 소리 켜짐 유지, 재로딩 후 첫 터치 재생, 수동 음소거 유지, 공격/반격 각각 Web Audio 소스 실행을 확인했다. 실제 소리를 듣거나 휴대폰 실기기로 검증하지 않았다.

로컬 전용 증빙(키트 미포함): `test-results/audio-continuity-20261024/`, `test-results/presentation-20261024/`, `test-results/haptics-20261024/`. 오디오 fixture는 별도 저장 키를 사용하며 관측 이벤트를 주입한다. 실제 캠페인 승률이나 원작 판정의 증거로 사용하지 않는다. 증빙 없이 로컬 결과를 새 환경에서 재확인했다고 주장하지 않는다.

## 이어서 할 작업

1. **오디오 실기기 확인 우선:** iPhone Safari/홈 화면 실행, Android Chrome에서 소리 켜기→다음 스테이지→앱 전환→복귀→재로딩→첫 터치 순서로 확인한다. 공격/반격/마법, BGM0·SFX만 재생, SFX0, 빠른 곡 교체, 수동 끄기를 구분한다. 가능하면 실제 청취를 기록한다. 기기가 없으면 미검증으로 남긴다.
2. **모바일 연출 회귀:** 320×568·390×844·가로 화면에서 HP 겹침, 긴 이동, 반격·치명타, 포탈·이동 취소, 적 추적, 수동 카메라 조작, 속도 변경·프레임 지연을 확인한다. 재현 가능한 결함을 최소 수정한다.
3. **원작 복원 미확정 사항:** 반격 예외, SAT 임계·획득량, 클리어XP·스크롤 보상, 원작 AI 전체 탐색/가중치, 분기 캠페인은 근거 확보 후 진행한다. 초기 기획 수치나 추측으로 되돌리지 않는다.
4. **밸런스:** 전략 AI 기준 측정은 과거180판/단일시드/기록 제한에 따른 것이다. 새 정책은 같은 조건으로 비교하고 승/패/제한 종료를 모두 보고한다. CLI `npm run lab:strategy -- data/lab/strategy-default.json`. 제한 종료를 승리나 패배로 바꾸지 않는다.

보고서는 `docs/reviews/claude-<날짜>-<고유ID>.md`에 새로 작성한다. 수정 파일, 재현 방법, 근거, 검사 결과, 남은 한계를 포함한다. 다른 검토자의 파일을 덮어쓰지 않는다. 근거 없는 전체 시스템 완성도나 원작 일치율은 쓰지 않는다.

## Claude에 붙여넣을 프롬프트

```text
Vantage Tactics 작업을 이어서 진행해줘. 먼저 docs/CLAUDE_HANDOFF_20261024.md와 안내된 최신 문서를 읽어줘.
같은 PC면 C:\VantageTactics가 개발 폴더야. 다른 환경이면 https://etin94-prog.github.io/vantage-tactics/review-kit.zip 을 새 폴더에 풀어 사용해줘. 저장소의 index.html은 배포 빌드라 직접 고치지 말고 소스를 수정한 뒤 빌드해줘.
우선 최신 소리 유지/타격음 수정과 모바일 전투 연출을 검증하고, 재현되는 버그는 코드까지 수정해줘. 수정 후 관련 회귀 검사, npm test, npm run check, npm run lab:test, 빌드를 실행해줘. 원작 전투 수치를 근거 없이 변경하지 말아줘.
소리 청취나 휴대폰 실기기 접근이 없으면 검증했다고 하지 말고 남은 항목으로 기록해줘. 작업 결과는 새 docs/reviews/claude-날짜-고유ID.md에 남기고 수정 파일·검사 결과·남은 과제를 알려줘. 이번 인계는 코드 수정까지이며 추가 공개 배포는 내가 요청할 때 진행해줘.
```
