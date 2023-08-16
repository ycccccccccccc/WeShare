import Image from "next/image";
import styles from "../styles/profile.module.scss";

export default function Profile() {
  return (
    <div className={styles.wholePage}>
      <div className={styles.picAndName}>
        <Image src="/個人照片.png" width={200} height={200} alt="" />
        <div className={styles.name}> 我是誰誰誰</div>
      </div>
      <div className={styles.tel_num}>
        <b>手機：</b> 0923-432-234
      </div>
      <div className={styles.starsAndRate}>
        <Image src="/rateStar.png" width={50} height={50} alt="" />
        <Image src="/rateStar.png" width={50} height={50} alt="" />
        <Image src="/rateStar.png" width={50} height={50} alt="" />
        <button type='button'className={styles.rateButton}>給予評分</button>
      </div>
    </div>
  );
}
