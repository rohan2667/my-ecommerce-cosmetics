// import React, { useState } from "react";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";

// const initialAddresses = [
//   {
//     id: 1,
//     name: "Home",
//     fullName: "Jane Doe",
//     street: "123 Main St",
//     city: "New York",
//     state: "NY",
//     zip: "10001",
//     country: "USA",
//     phone: "123-456-7890",
//   },
// ];

// const AddressBook = () => {
//   const [addresses, setAddresses] = useState(initialAddresses);
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     fullName: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     phone: "",
//   });

//   const resetForm = () => {
//     setForm({
//       name: "",
//       fullName: "",
//       street: "",
//       city: "",
//       state: "",
//       zip: "",
//       country: "",
//       phone: "",
//     });
//     setEditingId(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       !form.name ||
//       !form.fullName ||
//       !form.street ||
//       !form.city ||
//       !form.state ||
//       !form.zip ||
//       !form.country ||
//       !form.phone
//     ) {
//       alert("Please fill in all fields");
//       return;
//     }

//     if (editingId) {
//       setAddresses((addrs) =>
//         addrs.map((addr) =>
//           addr.id === editingId ? { id: editingId, ...form } : addr
//         )
//       );
//     } else {
//       setAddresses((addrs) => [...addrs, { id: Date.now(), ...form }]);
//     }
//     resetForm();
//   };

//   const handleEdit = (id) => {
//     const addr = addresses.find((a) => a.id === id);
//     setForm({ ...addr });
//     setEditingId(id);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this address?")) {
//       setAddresses((addrs) => addrs.filter((a) => a.id !== id));
//       if (editingId === id) resetForm();
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-gradient-to-tr from-pink-50 via-white to-pink-50 p-8 rounded-3xl shadow-xl border border-pink-200">
//       {addresses.length === 0 && (
//         <p className="text-center text-gray-500 mb-6">No saved addresses.</p>
//       )}

//       {/* Updated grid container here */}
//       <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {addresses.map((addr) => (
//           <li
//             key={addr.id}
//             className="group relative border border-pink-300 rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition cursor-pointer"
//             title={`${addr.name} Address`}
//           >
//             <h3 className="text-lg font-semibold text-pink-700 mb-0.5">
//               {addr.name}
//             </h3>
//             <p className="text-gray-700 font-medium text-sm">{addr.fullName}</p>
//             <p className="text-gray-600 text-sm leading-tight">
//               {addr.street}, {addr.city}, {addr.state} {addr.zip}, {addr.country}
//             </p>
//             <p className="text-gray-600 text-sm">Phone: {addr.phone}</p>

//             {/* Icon Buttons on hover */}
//             <div className="absolute bottom-3 right-3 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
//               <button
//                 onClick={() => handleEdit(addr.id)}
//                 className="text-pink-600 hover:text-pink-800 p-1 rounded-full hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
//                 aria-label={`Edit address: ${addr.name}`}
//                 type="button"
//               >
//                 <FaEdit size={18} />
//               </button>
//               <button
//                 onClick={() => handleDelete(addr.id)}
//                 className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
//                 aria-label={`Delete address: ${addr.name}`}
//                 type="button"
//               >
//                 <FaTrashAlt size={18} />
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 border border-pink-200">
//         <h3 className="text-xl font-bold text-pink-600 mb-5 text-center">
//           {editingId ? "Edit Address" : "Add New Address"}
//         </h3>
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4"
//           aria-label={editingId ? "Edit address form" : "Add new address form"}
//         >
//           {/* form inputs remain unchanged */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Address Name (Home, Work)"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
//             required
//             autoFocus
//           />
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={handleChange}
//             className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
//             required
//           />
//           <input
//             type="text"
//             name="street"
//             placeholder="Street Address"
//             value={form.street}
//             onChange={handleChange}
//             className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
//             required
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={form.city}
//               onChange={handleChange}
//               className="border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
//               required
//             />
//             <input
//               type="text"
//               name="state"
//               placeholder="State/Province"
//               value={form.state}
//               onChange={handleChange}
//               className="border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="zip"
//               placeholder="ZIP/Postal Code"
//               value={form.zip}
//               onChange={handleChange}
//               className="border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
//               required
//             />
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={form.country}
//               onChange={handleChange}
//               className="border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
//               required
//             />
//           </div>
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
//             required
//           />

//           <div className="flex justify-center gap-6 mt-6">
//             <button
//               type="submit"
//               className="bg-pink-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-pink-700 transition transform hover:-translate-y-1 active:scale-95"
//             >
//               {editingId ? "Update Address" : "Add Address"}
//             </button>
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-8 py-3 rounded-full border border-pink-600 text-pink-600 hover:bg-pink-100 transition"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddressBook;

import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const initialAddresses = [
  {
    id: 1,
    name: "Home",
    fullName: "Jane Doe",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    phone: "123-456-7890",
  },
];

const AddressBook = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      fullName: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: "",
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.fullName ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.zip ||
      !form.country ||
      !form.phone
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (editingId) {
      setAddresses((addrs) =>
        addrs.map((addr) =>
          addr.id === editingId ? { id: editingId, ...form } : addr
        )
      );
    } else {
      setAddresses((addrs) => [...addrs, { id: Date.now(), ...form }]);
    }
    resetForm();
  };

  const handleEdit = (id) => {
    const addr = addresses.find((a) => a.id === id);
    setForm({ ...addr });
    setEditingId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses((addrs) => addrs.filter((a) => a.id !== id));
      if (editingId === id) resetForm();
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-tr from-pink-50 via-white to-pink-50 p-8 rounded-3xl shadow-xl border border-pink-200">

      <div className="flex gap-12">
          {/* Address Form */}
        <div className="w-96 bg-white rounded-2xl shadow-lg p-6 border border-pink-200">
          <h3 className="text-lg font-bold text-pink-600 mb-5 text-center">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-label={editingId ? "Edit address form" : "Add new address form"}
          >
            {/* form inputs remain unchanged */}
            <input
              type="text"
              name="name"
              placeholder="Address Name (Home, Work)"
              value={form.name}
              onChange={handleChange}
              className="w-full text-sm border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
              required
              autoFocus
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full text-sm border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={form.street}
              onChange={handleChange}
              className="w-full border border-pink-300 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="text-sm border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State/Province"
                value={form.state}
                onChange={handleChange}
                className="text-sm border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zip"
                placeholder="ZIP/Postal Code"
                value={form.zip}
                onChange={handleChange}
                className="text-sm border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                className="text-sm border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
                required
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full text-sm border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-200 transition"
              required
            />

            <div className="flex justify-center gap-6 mt-6">
              <button
                type="submit"
                className="bg-white text-pink-700 border-1 px-5 py-2 text-sm rounded-full shadow-md hover:bg-pink-700 hover:text-white transition transform hover:-translate-y-1 active:scale-95"
              >
                {editingId ? "Update Address" : "Add Address"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-7 py-2 rounded-full border border-pink-600 text-pink-600 hover:bg-pink-700 hover:text-white transition transform hover:-translate-y-1 active:scale-95"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>


        {/* Address List */}
        <div className="flex-1">
          {addresses.length === 0 && (
            <p className="text-center text-gray-500 mb-6">No saved addresses.</p>
          )}

          {/* Updated grid container here */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {addresses.map((addr) => (
              <li
                key={addr.id}
                className="group relative border border-pink-300 rounded-xl p-4 shadow-lg bg-white hover:shadow-2xl transition cursor-pointer"
                title={`${addr.name} Address`}
              >
                <h3 className="text-medium font-semibold text-pink-700 mb-0.5">
                  {addr.name}
                </h3>
                <p className="text-gray-700 font-medium text-sm">{addr.fullName}</p>
                <p className="text-gray-600 text-sm leading-tight">
                  {addr.street}, {addr.city}, {addr.state} {addr.zip}, {addr.country}
                </p>
                <p className="text-gray-600 text-sm">Phone: {addr.phone}</p>

                {/* Icon Buttons on hover */}
                <div className="absolute bottom-3 right-3 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(addr.id)}
                    className="text-pink-600 hover:text-pink-800 p-1 rounded-full hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-label={`Edit address: ${addr.name}`}
                    type="button"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                    aria-label={`Delete address: ${addr.name}`}
                    type="button"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      
      </div>
    </div>
  );
};

export default AddressBook;
