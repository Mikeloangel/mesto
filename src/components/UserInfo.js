export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.innerText,
      about: this._aboutElement.innerText,
      avatar: this._avatarElement.src,
    }
  }

  setUserInfo({ name = 'null', about = 'null', avatar = null}) {
    this._nameElement.innerText = name;
    this._aboutElement.innerText = about;

    this.setAvatar(avatar,name);
  }

  setAvatar(avatar, name) {
    if (avatar) {
      this._avatarElement.alt = name;
      this._avatarElement.src = avatar;
    }
  }
}
