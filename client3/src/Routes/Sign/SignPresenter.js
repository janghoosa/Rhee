import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const SignPresenter = ({
    id,
    password,
    firstname,
    lastname,
    nickname,
    birth,
    sex,
    IdChange,
    PasswordChange,
    FnChange,
    LnChange,
    NicknameChange,
    BirthChange,
    SexChange,
    btnClick
}) => (
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <input onChange = {IdChange} type = 'text'></input>
    <input onChange = {PasswordChange} type = 'password'></input>
    <input onChange ={FnChange} type='text'></input>
    <input onChange ={LnChange} type='text'></input>
    <input onChange ={NicknameChange} type='text'></input>
    <input onChange = {BirthChange} type = "date"/>
    <input onChange = {SexChange} type='radio' name='sex' value='male' checked='checked'/>
    <input onChange = {SexChange} type='radio' name='sex' value='female'/>
    <button onClick = {btnClick}>Sign</button>
    </>
);

SignPresenter.propTypes = {
    id: PropTypes.string,
    password: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    nickname: PropTypes.string,
    birth: PropTypes.string,
    sex: PropTypes.string,
    IdChange: PropTypes.func.isRequired,
    PasswordChange: PropTypes.func.isRequired,
    FnChange: PropTypes.func.isRequired,
    LnChange: PropTypes.func.isRequired,
    NicknameChange: PropTypes.func.isRequired,
    BirthChange: PropTypes.func.isRequired,
    SexChange: PropTypes.func.isRequired,
    btnClick: PropTypes.func.isRequired
}

export default SignPresenter;