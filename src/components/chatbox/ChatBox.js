import downArrow from "../../assets/images/down-arrow.png";
import commentImg from "../../assets/images/speech-bubble.png";
import myPhoto from "../../assets/images/myphoto.png";
import "./ChatBox.css";
import Loading from "../shared/Loading";
import openSocket from "socket.io-client";

import CommentModal from "../shared/CommentModal";

import { useState, useRef, useEffect, useContext } from "react";

import {
  generateTime,
  generateTimeFromString,
  getDateString,
} from "../../shared/utils/getDate";

import dayjs from "dayjs";

import { url, getDate, getTime } from "../../shared/utils/getWeather";
import { AuthContext } from "../../shared/context/auth-context";
import axios from "axios";

import qq from "../../assets/audio/1688.mp3";

function isToday(dateString) {
  // 创建一个 Day.js 对象
  const date = dayjs(dateString);

  // 获取当前本地时间的 Day.js 对象
  const now = dayjs();

  // 使用 isSame 方法比较日期
  return date.isSame(now, "day");
}

export default function ChatBox() {
  const [isChat, setChat] = useState(false);
  const [weather, setWeather] = useState({});
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [loginError, setLoginError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [isGreetingLoading, setIsGreetingLoading] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [isAddNewMessageLoading, setIsAddNewMessageLoading] = useState(false);

  const { isLoggedIn, token, userId } = useContext(AuthContext);

  const audio = new Audio(qq);

  const audioRef = useRef(new Audio(qq));

  const scrollRef = useRef();

  const inputRef = useRef();

  const handleChat = () => {
    setChat(!isChat);
  };

  const fetchMessages = async () => {
    try {
      setIsMessageLoading(true);
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/chat/getChats"
      );

      const todayMessages = response.data.chats.filter((message) => {
        return isToday(message.date);
      });

      setAllMessages(todayMessages);
      setIsMessageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGreetings = async () => {
    if (navigator.geolocation) {
      setIsGreetingLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          url.currentWeather("lat=" + latitude, "lon=" + longitude)
        );
        const data = await response.json();
        setWeather({
          temp: data.main.temp,
          city: data.name,
          description: data.weather[0].description,
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          timezone: data.timezone,
        });
      });
      setIsGreetingLoading(false);
    }
  };

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (isChat) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 1000);
    return () => clearTimeout(scrollTimeout);
  }, [isChat]);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [allMessages]);

  useEffect(() => {
    fetchGreetings();
    fetchMessages();
  }, []);

  useEffect(() => {
    const socket = openSocket("https://jason-blog-961ffd3cf608.herokuapp.com");
    // const socket = openSocket("http://localhost:4000/");
    socket.on("chat", (data) => {
      setAllMessages((prevMessages) => [...prevMessages, data.chat]);
      if (data.userId !== userId) {
        // audio.play();
        playNotificationSound();
      }
    });
    return () => {
      socket.off("chat");
    };
  }, [userId]);

  const newMessageHandler = async () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setLoginError(true);
      return;
    }

    // Check if message is empty
    if (message.trim().length === 0) {
      setEmptyError(true);
      return;
    }

    const newMessage = {
      message: message,
    };
    try {
      setIsAddNewMessageLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/chat/addChat",
        newMessage,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setMessage("");
      setIsAddNewMessageLoading(false);
      // console.log(response.data);
      // setAllMessages((prevMessages) => [...prevMessages, response.data.chat]);
    } catch (error) {
      console.log(error);
    }
  };

  const playNotificationSound = () => {
    // 确保音频引用已初始化并已解锁
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("音频播放被阻止:", error);
      });
    }
  };

  // 在用户初次交互时播放音频
  const handleUserInteraction = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          audioRef.current.pause(); // 播放一瞬间后暂停，这样后续可以直接播放
        })
        .catch((error) => {
          console.error("初始音频播放失败:", error);
        });
    }
  };

  useEffect(() => {
    // 监听用户初次交互事件
    document.addEventListener("click", handleUserInteraction, { once: true });
    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return (
    <>
      <div>
        <img
          className={`chat-img ${!isChat ? "chat-active" : ""}`}
          src={commentImg}
          alt="chat logo"
          onClick={handleChat}
        />
        <img
          className={`down-arrow ${isChat ? "down-arrow-active" : ""}`}
          src={downArrow}
          alt="down arrow logo"
          onClick={handleChat}
        />

        <div className={`chat ${isChat && "chat-active"}`}>
          <div className="chat-title">
            <h1>Let's Chat</h1>

            <figure className="avatar">
              <img src={myPhoto} />
            </figure>
          </div>
          <div className="messages">
            <div className="messages-content" ref={scrollRef}>
              <p style={{ textAlign: "center" }}>{dayjs().format("HH:mm")}</p>

              <div className="message new">
                <figure className="avatar">
                  <img src={myPhoto} />
                </figure>
                Hi there, I'm Jason Zhou. Today is {getDateString()}.
                <div className="timestamp">message from Jason Zhou</div>
              </div>

              {Object.keys(weather).length > 0 &&
                (isGreetingLoading ? (
                  <Loading />
                ) : (
                  <div className="message new">
                    <figure className="avatar">
                      <img src={myPhoto} />
                    </figure>
                    You are now in {weather.city} {weather.country}. The
                    temperature right now is {weather.temp}°c. Sun rises at{" "}
                    {getTime(weather.sunrise, weather.timezone)} and sets at{" "}
                    {getTime(weather.sunset, weather.timezone)}.
                    <div className="timestamp">message from Jason Zhou</div>
                  </div>
                ))}

              {isMessageLoading ? (
                <div style={{ marginTop: "10px", float: "right" }}>
                  <Loading color="blue" />
                </div>
              ) : (
                allMessages.map((message) => {
                  if (isLoggedIn && message.user._id === userId) {
                    return (
                      <div
                        key={message._id}
                        className="message message-personal new"
                      >
                        <figure className="avatar-self">
                          <img src={message.user.image} />
                        </figure>
                        {message.message}
                        <div className="timestamp">
                          {dayjs(message.date).format("HH:mm")} -{" "}
                          {message.user.username}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={message._id} className="message new">
                        <figure className="avatar">
                          <img src={message.user.image} />
                        </figure>
                        {message.message}
                        <div className="timestamp">
                          {dayjs(message.date).format("HH:mm")} -{" "}
                          {message.user.username}
                        </div>
                      </div>
                    );
                  }
                })
              )}
            </div>
          </div>
          <div className="message-box">
            <input
              type="text"
              className="message-input"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  newMessageHandler();
                }
              }}
            />
            <button
              type="submit"
              className="message-submit"
              onClick={newMessageHandler}
              disabled={isAddNewMessageLoading}
            >
              {isAddNewMessageLoading ? <Loading /> : "Send"}
            </button>
          </div>
        </div>
      </div>
      <CommentModal
        show={loginError}
        error={"please login first before chatting"}
        onClear={() => setLoginError(false)}
      />
      <CommentModal
        show={emptyError}
        error={"Chat message cannot be empty"}
        onClear={() => setEmptyError(false)}
      />
    </>
  );
}
