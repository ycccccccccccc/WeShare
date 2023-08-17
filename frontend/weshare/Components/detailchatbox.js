import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "../styles/detailchatbox.module.scss";
import messagesData from "../Mockdata/messages.json";

export default function Deatailchatbox() {
  console.log(messagesData);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // 在頁面載入後，將聊天容器捲動到最底部
    console.log("hi");
    console.log(chatContainerRef.current);

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);
  return (
    <div className={styles.wholePage}>
      <div className={styles.chatboxTitle}>
        <Image src="/個人照片.png" alt="聊天室照片" width={60} height={60} />
        <div className={styles.chatboxName}>
          <b>王老先生有塊地</b>
        </div>
      </div>
      <div className={styles.chatMessages} ref={chatContainerRef}>
        {messagesData.Chats.map((chat) =>
          //  這邊到時候再改userid = myid
          chat.User.ID === 2 ? (
            <div key={chat.ID} className={styles.chatMessageLeft}>
              <Image
                src="/個人照片.png"
                alt="聊天室照片"
                width={60}
                height={60}
                className={styles.chatPic}
              />
              <span className={styles.messageText}>{chat.Message}</span>
            </div>
          ) : (
            <div key={chat.ID} className={styles.chatMessageRight}>
              <span className={styles.messageText}>{chat.Message}</span>
              <Image
                src="/個人照片.png"
                alt="聊天室照片"
                width={60}
                height={60}
                className={styles.chatPic}
              />
            </div>
          )
        )}
      </div>
      <div className={styles.horzontal_line}/>
      <div className={styles.sendMessageOutBorder}>
        <div className={styles.sendMessage}>
          <input placeholder="輸入訊息" className={styles.snedMessage_box} />
          <Image
            src="/right_arrow.png"
            alt="發送訊息"
            width={20}
            height={20}
            className={styles.sendMessage_icon}
          />
        </div>
      </div>
    </div>
  );
}
