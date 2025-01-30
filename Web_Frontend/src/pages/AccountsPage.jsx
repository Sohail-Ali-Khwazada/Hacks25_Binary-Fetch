import React from 'react';
import { MoreVertical, Plus } from 'lucide-react';

export const SocialAccountsManager = () => {
  const accounts = [
    {
      name: 'Inovector (Page)',
      platform: 'linkedin',
      added: '3 months ago',
      icon: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_1280.jpg'
    },
    {
      name: 'Dima Botezatu',
      platform: 'linkedin',
      added: '3 months ago',
      icon: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_1280.jpg'
    },
    {
      name: 'Dima Botezatu',
      platform: 'tiktok',
      added: '5 months ago',
      icon: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_1280.jpg'
    },
    {
      name: 'Inovector',
      platform: 'youtube',
      added: '5 months ago',
      icon: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      name: 'Dima Botezatu',
      platform: 'twitter',
      added: '5 months ago',
      icon: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      name: 'Inovector',
      platform: 'twitter',
      added: '5 months ago',
      icon: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      name: 'Dima Botezatu',
      platform: 'pinterest',
      added: '5 months ago',
      icon: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_1280.jpg'
    },
    {
      name: 'Dima Botezatu',
      platform: 'youtube',
      added: '5 months ago',
      icon: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_1280.jpg'
    },
    {
      name: 'Dima Botezatu',
      platform: 'mastodon',
      added: '5 months ago',
      icon: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_1280.jpg'
    },
    {
      name: 'lao9s',
      platform: 'instagram',
      added: '5 months ago',
      icon: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_1280.jpg'
    },
    {
      name: 'inovector_tech',
      platform: 'instagram',
      added: '5 months ago',
      icon: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_1280.jpg'
    },
    {
      name: 'Inovector Community',
      platform: 'facebook',
      added: '5 months ago',
      icon: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_1280.jpg'
    },
    {
      name: 'Inovector (Chisinau)',
      platform: 'facebook',
      added: '5 months ago',
      icon: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_1280.jpg'
    }
  ];

  const getPlatformColor = (platform) => {
    const colors = {
      linkedin: 'bg-blue-100 text-blue-600',
      facebook: 'bg-blue-100 text-blue-600',
      twitter: 'bg-blue-100 text-blue-400',
      youtube: 'bg-red-100 text-red-600',
      instagram: 'bg-red-100 text-red-600',
      tiktok: 'bg-gray-100 text-gray-600',
      pinterest: 'bg-red-100 text-red-600',
      mastodon: 'bg-blue-100 text-blue-600'
    };
    return colors[platform] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Social Accounts</h2>
      <p className="text-gray-600 mb-6">Connect a social account you'd like to manage.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Add Account Button */}
        <button className="flex items-center justify-center h-48 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <Plus className="w-6 h-6 text-gray-400" />
            <span className="text-gray-600">Add account</span>
          </div>
        </button>

        {/* Account Cards */}
        {accounts.map((account, index) => (
          <div key={index} className="relative bg-white rounded-lg border border-gray-200 p-4 h-48">
            <button className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
            
            <div className="flex flex-col items-center justify-center h-full space-y-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getPlatformColor(account.platform)}`}>
                <img
                  src={account.icon}
                  alt={account.name}
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-gray-900">{account.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Added: {account.added}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};