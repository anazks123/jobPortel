import React, { Fragment, useState } from 'react';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profile';

const CreateApplicantProfile = ({ createProfile, history }) => {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    phonenumber: '',
    skills: '',
  });

  const { phonenumber, skills } = formData;

  const onChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(false)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    // const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    console.log(formData.phonenumber.length)
    if(formData.phonenumber.length<10 || formData.phonenumber.length > 12){
      setError("invalid mobile")
      console.log("invalid mobile")
    }else{
      createProfile(formData, history, true, false);
    }

  };

  return (
    <Fragment>
      { error &&
      <div className="error-container" style={{padding:'20px',background:"red",color:"white"}}>
        {error}
      </div>
}
      <p className='lead'> Would u like to add your Skills</p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Enter Phonenumber'
            name='phonenumber'
            value={phonenumber}
            onChange={(e) => onChange(e)}

          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-primary my-1' to='/dashboard'>
          Go To Dashboard
        </Link>
      </form>
    </Fragment>
  );
};

CreateApplicantProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(
  withRouter(CreateApplicantProfile)
);
