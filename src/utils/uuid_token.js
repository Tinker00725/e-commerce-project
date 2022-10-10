import { v4 as uuidv4 } from 'uuid'

export function getId(){
    // 获取游客信息
    let uuid_token = localStorage.getItem('IDTOKEN')
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('IDTOKEN',uuid_token)
    }
    return uuid_token
}