import React, { useState } from "react";
import { User, MinusCircle, Edit, PlusCircle } from "lucide-react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    memberSince: "January 2023",
    subscription: {
      plan: "Premium 4K",
      status: "Active",
      price: "$19.99/month",
      nextBilling: "March 21, 2024",
      features: [
        "4K Ultra HD",
        "HDR Content",
        "Watch on 4 devices",
        "Offline Downloads",
        "Ad-free streaming",
      ],
    },
    paymentMethods: [
      {
        id: 1,
        type: "Visa",
        number: "•••• •••• •••• 4242",
        expiry: "12/25",
        default: true,
      },
      {
        id: 2,
        type: "Mastercard",
        number: "•••• •••• •••• 5555",
        expiry: "09/24",
        default: false,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Account Settings
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm relative ${
              activeTab === "profile"
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm relative ${
              activeTab === "subscription"
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("subscription")}
          >
            Subscription
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm relative ${
              activeTab === "payment"
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Payment Methods
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-lg shadow">
        {/* Profile Section */}
        {activeTab === "profile" && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="https://viver-myexlusive-server.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2024/08/08091555/CompressJPEG.Online_1_100kb_2144.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Change Photo
                </button>
              </div>

              {/* User Details */}
              <div className="flex-1 space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <p className="mt-1 font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="mt-1 font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="mt-1 font-medium">{userData.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Member Since
                    </label>
                    <p className="mt-1 font-medium">{userData.memberSince}</p>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button className="px-4 py-2 bg-orange-50 text-orange-400 rounded-md hover:bg-orange-100 cursor-pointer border border-orange-300 font-serif flex justify-center items-center gap-1">
                    <User size={16} color="orange" />
                    Edit Profile
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 cursor-pointer border border-red-300 font-serif flex justify-center items-center gap-1">
                    <Edit size={16} color="red" />
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Section */}
        {activeTab === "subscription" && (
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 font-serif">
                    Current Plan: <i className="text-orange-600">{userData.subscription.plan}</i>
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                    {userData.subscription.status}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-800 italic text-orange-500">
                  {userData.subscription.price}
                </p>
              </div>

              <p className="text-sm text-gray-500 font-serif">
                Next billing date: <i className="font-bold">{userData.subscription.nextBilling}</i>
              </p>

              <div className="border-t border-gray-200 pt-6 font-serif">
                <h3 className="text-lg font-medium mb-4">Plan Features:</h3>
                <ul className="space-y-3">
                  {userData.subscription.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4 pt-6">
                <button className="px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 cursor-pointer border border-green-300 font-serif flex justify-center items-center gap-1">
                  <Edit size={14} color="green" />
                  <span className="font-serif text-sm uppercase">Upgrade Plan</span>
                </button>
                <button className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 cursor-pointer border border-red-300 font-serif flex justify-center items-center gap-1">
                  <MinusCircle size={14} color="red" />
                  <span className="font-serif uppercase text-sm">Cancel Subscription</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods Section */}
        {activeTab === "payment" && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Saved Payment Methods
            </h2>

            <div className="space-y-4">
              {userData.paymentMethods.map((card) => (
                <div
                  key={card.id}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{card.type}</div>
                    <div className="text-gray-500">{card.number}</div>
                    <div className="text-sm text-gray-500">
                      Expires: {card.expiry}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {card.default ? (
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        Default
                      </span>
                    ) : (
                      <button className="text-sm text-orange-600 hover:text-orange-800">
                        Set as Default
                      </button>
                    )}
                    <button className="text-sm text-red-600 hover:text-red-800">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="px-4 py-2 bg-green-50 text-green-800 rounded-md hover:bg-green-100 cursor-pointer border border-green-600 font-serif flex justify-center items-center gap-1 mt-4">
              <PlusCircle size={16} color="green" />
              <span className="font-serif">Add Payment Method</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
