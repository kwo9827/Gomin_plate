import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sushi from "./Sushi";
import { fetchRailSushi } from "../store/slices/sushiSlice";

const INITIAL_BUFFER_SIZE = 10;
const BUFFER_THRESHOLD = 3;

const Rail = () => {
    const dispatch = useDispatch();
    const sushiList = useSelector((state) => state.sushi.railSushi);
    const [bufferSushi, setBufferSushi] = useState([]);
    const [activeSushi, setActiveSushi] = useState([]);

    // 초기 데이터 로드
    useEffect(() => {
        dispatch(fetchRailSushi());
    }, []);

    // 초기 버퍼 로드
    useEffect(() => {
        if (sushiList.length > 0 && bufferSushi.length === 0) {
            const initialBuffer = sushiList.slice(0, INITIAL_BUFFER_SIZE);
            setBufferSushi(initialBuffer);
        }
    }, [sushiList]);

    // 초밥 흘려보내기 및 버퍼 관리
    useEffect(() => {
        if (bufferSushi.length === 0) return;

        const interval = setInterval(() => {
            const [nextSushi, ...remainingBuffer] = bufferSushi;

            setActiveSushi(prev => [...prev, nextSushi]);
            setBufferSushi(remainingBuffer);

            if (remainingBuffer.length <= BUFFER_THRESHOLD) {
                dispatch(fetchRailSushi());
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [bufferSushi, dispatch]);

    // 새로운 초밥 데이터 추가
    useEffect(() => {
        if (sushiList.length > 0) {
            setBufferSushi(prev => [...prev, ...sushiList]);
        }
    }, [sushiList]);

    return (
        <div
            className="rail-container"
            style={{
                position: "relative",
                width: "100%",
                height: "200px",
                overflow: "hidden",
                border: "2px solid black",
            }}
        >
            {activeSushi.map((sushi, index) => (
                <div
                    key={`${sushi.sushiId}-${index}`}
                    style={{
                        position: "absolute",
                        left: "0px",
                        animation: `slide 5s linear forwards`,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                >
                    <Sushi id={sushi.sushiId} />
                </div>
            ))}
            <style>{`
                @keyframes slide {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(calc(100vw + 100%));
                    }
                }
            `}</style>
        </div>
    );
};

export default Rail;