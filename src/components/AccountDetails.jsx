import React, { useState } from "react";

const AccountDetails = () => {
  const [editing, setEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [form, setForm] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "123-456-7890",
    profilePic: null,
  });

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Name and Email are required.");
      return;
    }

    if (showPasswordForm) {
      const { currentPassword, newPassword, confirmPassword } = passwordFields;

      if (!currentPassword || !newPassword || !confirmPassword) {
        alert("All password fields are required.");
        return;
      }

      if (newPassword.length < 6) {
        alert("New password must be at least 6 characters.");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
      }

      // Simulate password change
      console.log("Password changed!");
    }

    alert("Account updated!");
    setSaved(true);
    setEditing(false);
    setShowPasswordForm(false);
    setPasswordFields({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white  rounded-lg shadow-lg space-y-2">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-pink-700 max-w-sm mx-auto bg-white rounded-lg shadow mb-5">Your Details</h2>
          
        </div>

        {!editing && (
          <>
            <div className="">
              <div className="flex justify-center mb-4">
                <img
                  src={form.profilePic || "/images/718mKhznbeL._SL1500_.jpg"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-pink-300 shadow"
                />
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-center space-x-2">
                <span className="font-medium">Name:</span>
                <span>{form.name}</span>
              </div>
              <div className="flex justify-center space-x-2">
                <span className="font-medium">Email:</span>
                <span>{form.email}</span>
              </div>
              <div className="flex justify-center space-x-2">
                <span className="font-medium">Phone:</span>
                <span>{form.phone || "N/A"}</span>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setEditing(true)}
                className="px-3 py-2 mb-5 bg-white text-pink-700 border-1 text-sm rounded-full shadow-md hover:bg-pink-700 hover:text-white transition transform hover:-translate-y-1 active:scale-95"
              >
                Edit Details
              </button>
              {saved && (
                <p className="mt-3 text-green-600 text-sm">Changes saved successfully!</p>
              )}
            </div>
          </>
        )}

        {editing && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Picture with Upload Option */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">Manage your profile and settings</p>
              <img
                src={form.profilePic || "/images/718mKhznbeL._SL1500_.jpg"}
                alt="Profile"
                className="w-20 h-20 mx-auto mb-5 rounded-full object-cover border-2 border-pink-300 shadow"
              />
              <label className="cursor-pointer px-2 py-2 bg-white text-pink-700 border-1 text-sm rounded-full shadow-md hover:bg-pink-700 hover:text-white ">
                Upload New
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setForm((prev) => ({ ...prev, profilePic: reader.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {/* Name */}
            <div>
              <label className="block px-7 text-sm text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="flex w-100 mx-auto mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block px-7 text-sm text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="flex w-100 mx-auto mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block px-7 text-sm text-gray-700 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="flex w-100 mx-auto mt-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Optional"
              />
            </div>

            {/* Change Password Toggle */}
            {!showPasswordForm ? (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(true)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Change Password
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-md space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Change Password</h3>

                <div>
                  <label className="block px-3 text-xs text-gray-600 font-medium">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordFields.currentPassword}
                    onChange={handlePasswordChange}
                    className="flex w-100 mx-auto mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block px-3 text-xs text-gray-600 font-medium">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordFields.newPassword}
                    onChange={handlePasswordChange}
                    className="flex w-100 mx-auto mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block px-3 text-xs text-gray-600 font-medium">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordFields.confirmPassword}
                    onChange={handlePasswordChange}
                    className="flex w-100 mx-auto mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="text-xs text-gray-500 hover:underline"
                  >
                    Cancel Password Change
                  </button>
                </div>
              </div>
            )}

            {/* Save/Cancel Buttons */}
            <div className="flex justify-center gap-10 mb-5">
              <button
                type="submit"
                className="px-3 py-2 bg-white text-pink-700 border-1 text-sm rounded-full shadow-md hover:bg-pink-700 hover:text-white transition transform hover:-translate-y-1 active:scale-95"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setShowPasswordForm(false);
                  setPasswordFields({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="px-5 py-2 bg-white text-pink-700 border-1 text-sm rounded-full shadow-md hover:bg-pink-700 hover:text-white transition transform hover:-translate-y-1 active:scale-95"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
