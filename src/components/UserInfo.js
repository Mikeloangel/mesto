export default class UserInfo{
  constructor({nameSelector,descriptionSelector}){
    this._name = document.querySelector(nameSelector);
    this._decsription = document.querySelector(descriptionSelector);
  }

  getUserInfo(){
    return {
      name: this._name.innerText,
      description: this._decsription.innerText
    }
  }

  setUserInfo({name, description}){
    this._name.innerText = name;
    this._decsription.innerText = description;
  }
}
