import MarkdownIt from "markdown-it";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyPhoto from "../../assets/images/myphoto.png";
import Picker from "emoji-picker-react";
import Badge from "react-bootstrap/Badge";
import CommentModal from "./CommentModal";
import ErrorModal from "./ErrorModal";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { useRef, useState, useEffect, useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { Link } from "react-scroll";
import { generateDate } from "../../shared/utils/getDate";

import "./Post.css";
import Review from "./Review";
import Button from "react-bootstrap/Button";
import MySpinner from "../layout/MySpinner";

const stringReplace = (markdownText) => {
  const transformedText = markdownText.replace(
    /<h2>(.*?)<\/h2>/g,
    (_, content) => {
      const elementContent = `<h2>${content}</h2>`;
      return `<Element name="targetElement-${content}" key="${content}">${elementContent}</Element>`;
    }
  );

  return transformedText;
};

export default function Post({ post }) {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showIsLogin, setShowIsLogin] = useState(false);

  const [showIsNoContent, setShowIsNoContent] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/reviews/${post.id}`
        );
        setReviews(responseData.reviews);
      } catch (err) {}
    };
    if (post.id) {
      fetchReviews();
    }
  }, [sendRequest, post.id, trigger]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const auth = useContext(AuthContext);

  const textArea = useRef(null);

  const onEmojiClick = (emojiObject) => {
    setTextAreaValue((textAreaValue) => {
      return (
        textAreaValue.slice(0, textArea.current.selectionStart) +
        emojiObject.emoji +
        textAreaValue.slice(textArea.current.selectionEnd)
      );
    });
    setShowEmoji(false);
  };

  const openEmojiHandler = () => {
    setShowEmoji(!showEmoji);
  };

  const textAreaInputHandler = (e) => {
    setTextAreaValue(e.target.value);
  };

  const md = new MarkdownIt({ html: true });
  
  let markdownText;
  let h2Texts = [];
  let result;

  if (post.markdown) {
    markdownText = md.render(post.markdown);
    result = stringReplace(markdownText);

    const parser = new DOMParser();
    const doc = parser.parseFromString(result, "text/html");
    const headers = doc.querySelectorAll("element");
    headers.forEach((h2) => {
      h2Texts.push(h2.getAttribute("name"));
    });
  }

  // if (post.markdown) {
  //   markdownText = md.render(post.markdown);
  // } else {
  //   markdownText = md.render(
  //     `## 课程介绍\n![image20211219121555979.png](https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/31/e7131718e9e64faeaf3fe16404186eb4.png)\n\n## 0. 简介\n\n​\t**Spring Secur
  //       ity** 是 Spring 家族中的一个安全管理框架。相比与另外一个安全框架**Shiro**，它提供了更丰富的
  //       功能，社区资源也比Shiro丰富。\n\n​\t一般来说中大型的项目都是使用**SpringSecurity** 来做安全框架。
  //       小项目有Shiro的比较多，因为相比与SpringSecurity，Shiro的上手更加的简单。\n\n​\t 一般Web应用的需要进
  //       行**认证**和**授权**。\n\n​\t\t**认证：验证当前访问系统的是不是本系统的用户，并且要确认具体是哪个用户**
  //       \n\n​\t\t**授权：经过认证后判断当前用户是否有权限进行某个操作**\n\n​\t而认证和授权也是SpringSecurity作为
  //       安全框架的核心功能。\n\n\n\n## 1. 快速入门\n\n### 1.1 准备工作\n\n​\t我们先要搭建一个简单的SpringBoot
  //       工程\n\n① 设置父工程 添加依赖\n\n~~~~\n    <parent>\n        <groupId>org.springframewo
  //       rk.boot</groupId>\n        <artifactId>spring-boot-starter-parent</artifactId>\n
  //            <version>2.5.0</version>\n    </parent>\n    <dependencies>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n        </dependency>\n        <dependency>\n            <groupId>org.projectlombok</groupId>\n            <artifactId>lombok</artifactId>\n            <optional>true</optional>\n        </dependency>\n    </dependencies>\n~~~~\n\n② 创建启动类\n\n~~~~\n@SpringBootApplication\npublic class SecurityApplication {\n\n    public static void main(String[] args) {\n        SpringApplication.run(SecurityApplication.class,args);\n    }\n}\n\n~~~~\n\n③ 创建Controller\n\n~~~~java\n\nimport org.springframework.web.bind.annotation.RequestMapping;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class HelloController {\n\n    @RequestMapping("/hello")\n    public String hello(){\n        return "hello";\n    }\n}\n\n~~~~\n\n\n\n### 1.2 引入SpringSecurity\n\n​\t在SpringBoot项目中使用SpringSecurity我们只需要引入依赖即可实现入门案例。\n\n~~~~xml\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-security</artifactId>\n        </dependency>\n~~~~\n\n​\t引入依赖后我们在尝试去访问之前的接口就会自动跳转到一个SpringSecurity的默认登陆页面，默认用户名是user,密码会输出在控制台。\n\n​\t必须登陆之后才能对接口进行访问。\n\n\n\n## 2. 认证\n\n### 2.1 登陆校验流程\n![image20211215094003288.png](https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/31/414a87eeed344828b5b00ffa80178958.png)`
  //   );
  // }

  // const h2Texts = [];

  const links = h2Texts.map((h2Text, index) => {
    return (
      <Link key={index} to={h2Text} duration={500} className="links-option">
        <p>{h2Text.substring(14)}</p>
      </Link>
    );
  });

  const publishCommentHandler = async () => {
    if (textAreaValue.trim().length === 0) {
      setShowIsNoContent(true);
      return;
    }

    if (!auth.isLoggedIn) {
      setShowIsLogin(true);
      return;
    }

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/reviews/createReview",
        "POST",
        JSON.stringify({
          postId: post.id,
          content: textAreaValue,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      setTextAreaValue("");
      setTrigger(!trigger);
    } catch (err) {}
  };

  return (
    <>
      <section className="section mt-5 ">
        <Row className="justify-content-between align-items-start">
          <Col lg={8} md={12} className="markdown-body">
            <div className="markdown-header d-flex align-items-center">
              <div className="profile-container">
                <img src={MyPhoto} alt="avatar" />
              </div>
              <div className="profile-content">
                <p className="name">Jason Zhou</p>
                <p>{generateDate(post.date)} / {post.views} views</p>
              </div>
            </div>

            <h3 className="markdown-title">{post.title}</h3>
            <p>{post.intro}</p>
            {post.thumbnail && (
              <img
                src={process.env.REACT_APP_ASSET_URL + `/${post.thumbnail}`}
                alt="thumbnail"
                className="w-100"
              />
            )}
            {post.uploadImage && (
              <LazyLoadImage
                src={URL.createObjectURL(post.uploadImage)}
                effect="blur"
                alt="thumbnail"
                className="w-100"
              />
            )}

            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: result }}
            ></div>
            {!post.isAdmin && (
              <div className="position-relative">
                <h4>Add comments</h4>
                <div className="input-group mb-4">
                  <textarea
                    className="form-control comment-input"
                    aria-label="With textarea"
                    placeholder="Leave your comments here"
                    value={textAreaValue}
                    onChange={textAreaInputHandler}
                    ref={textArea}
                  ></textarea>
                </div>
                <button className="emoji-btn my-4" onClick={openEmojiHandler}>
                  emoji
                </button>
                <div className="emoji-container">
                  {showEmoji && <Picker onEmojiClick={onEmojiClick} />}
                </div>

                <Button
                  onClick={publishCommentHandler}
                  className="textbox-btn mt-4"
                  disabled={isLoading}
                >
                  send
                </Button>
                <h4>All comments</h4>
                {reviews.length === 0 && !isLoading && (
                  <h3>
                    <Badge bg="success">
                      No comments yet. Leave first comment!
                    </Badge>
                  </h3>
                )}
                {isLoading && <MySpinner />}
                {reviews.length > 0 &&
                  reviews.map((review) => {
                    return (
                      <Review
                        key={review.id}
                        avatar={review.creatorAvatar}
                        content={review.content}
                        username={review.creatorName}
                        date={review.date}
                        id={review.id}
                        creatorId={review.creatorId}
                        onTrigger={() => setTrigger(!trigger)}
                        // creatorId={review.creatorId}
                      />
                    );
                  })}
              </div>
            )}
          </Col>
          <Col md={3} className="d-none d-lg-block menu">
            <h4 className="mb-4">table of content</h4>
            {links}
          </Col>
        </Row>
      </section>

      <CommentModal
        show={showIsLogin}
        error={"please login first before leave comments"}
        onClear={() => setShowIsLogin(false)}
      />
      <CommentModal
        show={showIsNoContent}
        error={"please leave your comments before publish"}
        onClear={() => setShowIsNoContent(false)}
      />

      <ErrorModal error={error} onClear={clearError} />
    </>
  );
}
