import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

// 404 component
export default function NotFound({ mes, nav }) {
  const [countdown, setCountdown] = useState(3);
  // Inside your component
  const navigate = useNavigate();
  // Redirect to home page after 3 seconds
  useEffect(() => {
    if (countdown > 0) {
      //将 `setTimeout` 的返回值赋给 `timer` 变量并不会影响定时器的执行。
      // 这个赋值操作只是将定时器 ID 保存下来，以便稍后在需要取消定时器时使用。

      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      navigate(nav);
    }
  }, [navigate, countdown, nav]);

  return (
    <div className="container">
      <h1>
        {mes}
        You will be redirected to the home page in {countdown} seconds.
      </h1>
    </div>
  );
}
