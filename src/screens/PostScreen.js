import Preloader from "../components/banner/Preloader";
import MarkdownIt from "markdown-it";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyPhoto from "../assets/images/myphoto.png";
import Picker from "emoji-picker-react";
import { useRef, useState } from "react";

import { Link } from "react-scroll";

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

export default function PostScreen() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const textArea = useRef(null);

  const onEmojiClick = (emojiObject) => {
    console.log(emojiObject);
    setTextAreaValue(
      textAreaValue.slice(0, textArea.current.selectionStart) +
        emojiObject.emoji +
        textAreaValue.slice(textArea.current.selectionEnd)
    );
  };

  const openEmojiHandler = () => {
    setShowEmoji(!showEmoji);
  };

  const textAreaInputHandler = (e) => {
    console.log(e.target.value);
    setTextAreaValue(e.target.value);
  };

  const md = new MarkdownIt();
  const markdownText = md.render(
    '## 课程介绍\n![image20211219121555979.png](https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/31/e7131718e9e64faeaf3fe16404186eb4.png)\n\n## 0. 简介1\n\n​\t**Spring Security** 是 Spring 家族中的一个安全管理框架。相比与另外一个安全框架**Shiro**，它提供了更丰富的功能，社区资源也比Shiro丰富。\n\n​\t一般来说中大型的项目都是使用**SpringSecurity** 来做安全框架。小项目有Shiro的比较多，因为相比与SpringSecurity，Shiro的上手更加的简单。\n\n​\t 一般Web应用的需要进行**认证**和**授权**。\n\n​\t\t**认证：验证当前访问系统的是不是本系统的用户，并且要确认具体是哪个用户**\n\n​\t\t**授权：经过认证后判断当前用户是否有权限进行某个操作**\n\n​\t而认证和授权也是SpringSecurity作为安全框架的核心功能。\n\n\n\n## 1. 快速入门\n\n### 1.1 准备工作\n\n​\t我们先要搭建一个简单的SpringBoot工程\n\n① 设置父工程 添加依赖\n\n~~~~\n    <parent>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-parent</artifactId>\n        <version>2.5.0</version>\n    </parent>\n    <dependencies>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n        </dependency>\n        <dependency>\n            <groupId>org.projectlombok</groupId>\n            <artifactId>lombok</artifactId>\n            <optional>true</optional>\n        </dependency>\n    </dependencies>\n~~~~\n\n② 创建启动类\n\n~~~~\n@SpringBootApplication\npublic class SecurityApplication {\n\n    public static void main(String[] args) {\n        SpringApplication.run(SecurityApplication.class,args);\n    }\n}\n\n~~~~\n\n③ 创建Controller\n\n~~~~java\n\nimport org.springframework.web.bind.annotation.RequestMapping;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class HelloController {\n\n    @RequestMapping("/hello")\n    public String hello(){\n        return "hello";\n    }\n}\n\n~~~~\n\n\n\n### 1.2 引入SpringSecurity\n\n​\t在SpringBoot项目中使用SpringSecurity我们只需要引入依赖即可实现入门案例。\n\n~~~~xml\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-security</artifactId>\n        </dependency>\n~~~~\n\n​\t引入依赖后我们在尝试去访问之前的接口就会自动跳转到一个SpringSecurity的默认登陆页面，默认用户名是user,密码会输出在控制台。\n\n​\t必须登陆之后才能对接口进行访问。\n\n\n\n## 2. 认证\n\n### 2.1 登陆校验流程\n![image20211215094003288.png](https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/31/414a87eeed344828b5b00ffa80178958.png)'
  );

  const result = stringReplace(markdownText);

  const parser = new DOMParser();
  const doc = parser.parseFromString(result, "text/html");
  const headers = doc.querySelectorAll("element");

  const h2Texts = [];
  headers.forEach((h2) => {
    h2Texts.push(h2.getAttribute("name"));
  });

  const links = h2Texts.map((h2Text, index) => {
    return (
      <Link key={index} to={h2Text} duration={500} className="links-option">
        <p>{h2Text.substring(14)}</p>
      </Link>
    );
  });

  return (
    <>
      <Preloader words={["Post"]} />
      <section className="section mt-5 ">
        <Row className="justify-content-between align-items-start">
          <Col lg={8} md={12} className="markdown-body">
            <div className="markdown-header d-flex align-items-center">
              <div className="profile-container">
                <img src={MyPhoto} alt="avatar" />
              </div>
              <div className="profile-content">
                <p className="name">Jason Zhou</p>
                <p>August 10, 2023 / 100 views</p>
              </div>
            </div>
            <h3 className="markdown-title">Spring Security</h3>
            <p>
              SpringSecurity框架教程-Spring
              Security+JWT实现项目级前端分离认证授权
            </p>

            <div dangerouslySetInnerHTML={{ __html: result }}></div>

            <div className="position-relative">
              <h4>Add comments</h4>
              <div className="input-group mb-4">
                {/* <span className="input-group-text">With textarea</span> */}
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

              <button className="textbox-btn mt-4">send</button>
              <h4>All comments</h4>
            </div>
          </Col>
          <Col md={3} className="d-none d-lg-block menu">
            <h4 className="mb-4">table of content</h4>
            {links}
          </Col>
        </Row>
      </section>
    </>
  );
}
