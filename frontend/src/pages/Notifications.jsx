import { Bell, Clock, Check, X } from "lucide-react"

const notifications = [
    {
      id: 1,
      sender: "John Doe",
      profilePic: "https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=",
      text: 'commented on your review of "Inception"',
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      sender: "Jane Smith",
      profilePic: "https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=",
      text: 'liked your comment on "The Shawshank Redemption"',
      time: "1 day ago",
      isRead: true,
    },
    {
      id: 3,
      sender: "Movie Club",
      profilePic: "https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=",
      text: "New movies added to your watchlist!",
      time: "3 days ago",
      isRead: false,
    },
    {
      id: 4,
      sender: "Alex Johnson",
      profilePic: "https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=",
      text: 'liked your review of "The Dark Knight"',
      time: "4 hours ago",
      isRead: false,
    },
    {
      id: 5,
      sender: "Emma Watson",
      profilePic: "https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=",
      text: 'replied to your comment on "Interstellar"',
      time: "5 hours ago",
      isRead: true,
    },
    {
      id: 6,
      sender: "Movie Club",
      profilePic: "https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=",
      text: "Don't forget to check out the new movies added to your favorites!",
      time: "2 days ago",
      isRead: true,
    },
    {
      id: 7,
      sender: "Lucas Green",
      profilePic: "https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=",
      text: 'commented on your review of "Fight Club"',
      time: "1 week ago",
      isRead: false,
    },
    {
      id: 8,
      sender: "Sara Lee",
      profilePic: "https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=",
      text: 'liked your comment on "The Godfather"',
      time: "2 days ago",
      isRead: false,
    },
    {
      id: 9,
      sender: "Movie Club",
      profilePic: "https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=",
      text: "You have new recommendations based on your watchlist!",
      time: "4 days ago",
      isRead: true,
    },
    {
      id: 10,
      sender: "Tom Hanks",
      profilePic: "https://media.istockphoto.com/id/492529287/photo/portrait-of-happy-laughing-man.jpg?s=612x612&w=0&k=20&c=0xQcd69Bf-mWoJYgjxBSPg7FHS57nOfYpZaZlYDVKRE=",
      text: 'liked your review of "Forrest Gump"',
      time: "6 hours ago",
      isRead: false,
    },
  ];
  

export default function Notifications() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Bell className="mr-2" />
        Notifications
      </h1>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start p-4 rounded-lg shadow-md transition-colors duration-300 ${
              notification.isRead ? "bg-white" : "bg-red-50"
            }`}
          >
            <img
              src={notification.profilePic || "/placeholder.svg"}
              alt={`${notification.sender}'s profile`}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex-grow">
              <p className="font-semibold">{notification.sender}</p>
              <p className="text-gray-600">{notification.text}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{notification.time}</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              {!notification.isRead && <span className="bg-red-900 w-3 h-3 rounded-full mb-2"></span>}
              <button className="text-gray-400 hover:text-gray-600">
                <Check className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No notifications at the moment</p>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button className="text-red-900 hover:text-red-800 font-semibold">Mark all as read</button>
        <button className="text-gray-600 hover:text-gray-800 font-semibold flex items-center">
          <X className="w-4 h-4 mr-1" />
          Clear all
        </button>
      </div>
    </div>
  )
}

