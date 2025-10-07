
import React, { useState, useEffect } from 'react';
import { Governorate, Post, User } from '../../types.ts';
import { PlayIcon } from '../icons/Icons.tsx';
import * as api from '../../services/apiService.ts';

interface ReelsViewProps {
  selectedGovernorate: Governorate | 'All';
  onSelectReel: (reel: Post) => void;
  user: User | null;
  requestLogin: () => void;
}

const ReelsView: React.FC<ReelsViewProps> = ({ selectedGovernorate, onSelectReel, user, requestLogin }) => {
  const [reelPosts, setReelPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReels = async () => {
      setIsLoading(true);
      try {
        const reels = await api.getPosts({ type: 'Reel', governorate: selectedGovernorate });
        setReelPosts(reels);
      } catch (error) {
        console.error("Failed to fetch reels:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReels();
  }, [selectedGovernorate]);


  const handleClick = (post: Post) => {
    if (!user) {
        requestLogin();
    } else {
        onSelectReel(post);
    }
  };

  if (isLoading) {
    return <div className="text-center py-16">Loading Reels...</div>
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4">Reels</h2>
      {reelPosts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
          {reelPosts.map(post => (
            <button
              key={post.id}
              onClick={() => handleClick(post)}
              className="aspect-[9/16] bg-neutral-gray-medium dark:bg-gray-700 rounded-lg overflow-hidden relative group focus:outline-none focus:ring-2 focus:ring-action-blue focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label={`Play reel by ${post.author.name}`}
            >
              <img src={post.mediaUrl} alt={post.content} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <PlayIcon className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-xs font-semibold truncate">{post.author.name}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-center text-gray-500 py-16">
          <p>No Reels available for<br />{selectedGovernorate}.</p>
        </div>
      )}
    </div>
  );
};

export default ReelsView;
