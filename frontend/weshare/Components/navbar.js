import Image from "next/image";
import style from "../styles/navbar.module.scss";

export default function Navbar() {
  //   const router = useRouter();

  return (
    <header className={style.border}>
      <Image src="/logo.png" width={100} height={100} alt="" />
      <div className={style.weshare}>We Share</div>
      <div>
        <div className={style.search_bar}>
          <Image
            className={style.search_pic}
            src="/search.png"
            width={40}
            height={40}
            alt=""
          />
          <input
            type="text"
            // value={enterSearch}
            placeholder="搜尋"
            className={style.searching}
            // onChange={handleInputChange}
          />
          <select className={style.filter}>
            <option>選項</option>
            <option>消耗品</option>
            <option>清潔用品</option>
            <option>食物</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
        </div>
      </div>
      <div className={style.share_post}>Share</div>
      <Image
        className={style.message_box}
        src="/message_box.png"
        width={36}
        height={36}
        alt=""
      />
      <Image
        className={style.notification}
        src="/notification_icon.png"
        width={36}
        height={36}
        alt=""
      />
      <Image
        className={style.profile_pic}
        src="/個人照片.png"
        width={36}
        height={36}
        alt=""
        // onClick={enterPersonalProfile}
      />
    </header>
  );
}
