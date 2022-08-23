export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avaSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avaSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.innerText,
      about: this._aboutElement.innerText,
      avatar: this._avatarElement.src,
      id: this._id,
      cohort: this._cohort,
    }
  }

  setUserInfo({ name = 'null', about = 'null', avatar = null, id = null, cohort = null }) {
    this._nameElement.innerText = name;
    this._aboutElement.innerText = about;
    if (avatar) {
      this._avatarElement.alt = name;
      this._avatarElement.src = avatar;
    }

    this._id = id ? id : this._id;
    this._cohort = cohort ? cohort : this._cohort;
  }
}
