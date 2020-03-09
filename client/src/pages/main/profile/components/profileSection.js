import React from 'react';
import { inject } from 'mobx-react';
import { authApi } from 'libs/api';
import { MdAccountCircle } from 'react-icons/md';

class ProfileSection extends React.Component {
    onSave = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('email', e.target['email'].value);
        formData.append('fullName', e.target['fullName'].value);
        formData.append('profileImage', e.target['profileImage'].files[0]);

        // fetch and set profile
        const { data } = await authApi.updateProfile(formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        this.props.updateProfile(data.user);
    };

    render() {
        return (
            <form className="profile-section" onSubmit={this.onSave}>
                {/* change profile image */}
                <section className="profile-image">
                    {this.props.userProfile.profile?.picture ? (
                        <div className="image">
                            <img src={this.props.userProfile.profile.picture} alt="Your profile" />
                        </div>
                    ) : (
                        <MdAccountCircle className="icon" />
                    )}

                    <input
                        id="profileImage"
                        type="file"
                        className="file-picker"
                        accept="image/*"
                        required
                    />
                </section>

                <section className="profile-details">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            className="form-input"
                            id="fullName"
                            type="text"
                            defaultValue={this.props.userProfile.profile.name}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input
                            className="form-input"
                            id="email"
                            type="email"
                            defaultValue={this.props.userProfile.email}
                            required
                        />
                    </div>
                </section>

                <button type="submit" className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        );
    }
}

const mapStateToProps = ({ rootStore }) => {
    const { updateProfile, profile } = rootStore.userStore;

    return {
        updateProfile,
        userProfile: profile
    };
};

export default inject(mapStateToProps)(ProfileSection);
