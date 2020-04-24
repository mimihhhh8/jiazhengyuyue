import styled from 'styled-components';


export const Contents = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580728273465&di=e65d073c2730c7f4988c6ba0ddfc9e74&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1191326208%2C3129627920%26fm%3D214%26gp%3D0.jpg') no-repeat;
    background-size:100% 100%;
    display:flex;
    justify-content:center;
    align-items:center;
    .Centerbox{
        width:300px;
        height:400px;
        border-radius:10px;
        background:#fff;
        padding:35px 15px;
        .logo{
            margin-left:70px;
            width:130px;
            height:80px;
            padding-bottom:25px;
            img{
                width:130px;
                height:60px;
            }
        }
        .radio{
            width:100%;
            display:flex;
            justify-content:space-around;
            margin-bottom:25px;
        }
        .username{
            margin-bottom:25px;
        }
        .userpass{
            margin-bottom:25px;
        }
        .jump_link{
            margin-top:25px;
        }
    }

`