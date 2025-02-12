import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAnswers } from "../store/slices/answerSlice";
import SushiAnswerCard from "../components/SushiAnswerCard";
import { useTrail, animated } from "@react-spring/web";

const MyAnswerList = () => {
  const dispatch = useDispatch();
  const myAnswers = useSelector((state) => state.answer.myAnswers || {}); // 객체 초기화

  useEffect(() => {
    dispatch(
      fetchMyAnswers({
        page: 1,
        size: 10,
      })
    ).then((result) => {
      console.log("내 답변 리스트:", result.payload.data.content);
    });
  }, [dispatch]);

  useEffect(() => {
    console.log("현재 내 답변 상태:", myAnswers);
  }, [myAnswers]);

  // `myAnswers.content`가 존재하지 않으면 빈 배열을 기본값으로 설정
  const answerList = myAnswers.content || [];

  // 애니메이션을 위해 useTrail 사용
  const trail = useTrail(answerList.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { tension: 250, friction: 25 }, // 애니메이션 속도 조절
  });

  return (
    <div style={styles.background}>
      {/* 나의 답변 박스 */}
      <div style={styles.listContainer}>
        <div style={styles.position}>
          <div style={styles.outerBox}>
            <div style={styles.innerBox}>나의 답변</div>
          </div>
        </div>

        {/* 답변 리스트 */}
        {answerList.length > 0 ? (
          <ul style={styles.list}>
            {trail.map((props, index) => (
              <animated.li key={answerList[index].sushiId} style={{ ...props, ...styles.listItem }}>
                <SushiAnswerCard
                  id={answerList[index].sushiId}
                  category={answerList[index].category}
                  title={answerList[index].title}
                  content={answerList[index].content}
                  showHeart={answerList[index].isLiked || answerList[index].getLike}
                  sushiType={answerList[index].sushiType}
                />
              </animated.li>
            ))}
          </ul>
        ) : (
          <div style={styles.noResult}>등록된 답변이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  /** 배경 스타일 */
  background: {
    position: "relative",
    height: "100vh",
    width: "55vh",
    overflowY: "auto",
    scrollbarWidth: "none",
  },
  /** 리스트 감싸는 스타일 */
  listContainer: {
    position: "relative",
    zIndex: 2,
    width: "55vh",
    margin: "0 auto",
    padding: "3vh",
    boxSizing: "border-box",
  },
  position: {},
  /** 나의 답변 외부 박스 */
  outerBox: {
    width: "35vh",
    margin: "0 auto 1.5vh",
    border: "0.7vh solid #8B6B3E",
    borderRadius: "1.2vh",
    backgroundColor: "#B2975C",
    padding: "1vh",
    boxSizing: "border-box",
  },
  /** 나의 답변 내부 박스 */
  innerBox: {
    width: "100%",
    border: "0.3vh solid #906C48",
    borderRadius: "0.6vh",
    backgroundColor: "#B2975C",
    textAlign: "center",
    color: "#5D4A37",
    fontSize: "3.8vh",
    fontWeight: "bold",
    padding: "0.7vh 0",
    boxSizing: "border-box",
  },
  /** 검색 결과 없을 때 */
  noResult: {
    textAlign: "center",
    color: "#8B6B3E",
    fontSize: "2.8vh",
    marginTop: "3.5vh",
  },
  /** 글 리스트 스타일 */
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "1vh",
  },
};

export default MyAnswerList;