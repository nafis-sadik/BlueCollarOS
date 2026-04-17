import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Camera, 
  Users,
  Award,
  Trophy
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function CompanyFeed() {
  const posts = [
    {
      id: 1,
      author: 'Jerry (Owner)',
      avatar: 'https://picsum.photos/seed/jerry/100/100',
      time: '3h ago',
      content: 'Huge shoutout to Adam and his crew for finishing the Maple St prep ahead of schedule! Quality looking top-notch. Keep it up! 🏆',
      image: 'https://picsum.photos/seed/const/800/600',
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      author: 'Adam (Crew Lead)',
      avatar: 'https://picsum.photos/seed/adam/100/100',
      time: '5h ago',
      content: 'Beautiful morning at the Pine Ave deck repair. Progress is moving smooth! #JerryConstruction #BlueCollarStrong',
      image: 'https://picsum.photos/seed/deck/800/600',
      likes: 18,
      comments: 2
    },
    {
      id: 3,
      author: 'Mike (Manager)',
      avatar: 'https://picsum.photos/seed/mike/100/100',
      time: '1d ago',
      content: 'Reminder: New safety boots have arrived at the office. Please swing by to pick up your pair if you registered! 🥾',
      likes: 42,
      comments: 12
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Company Feed</h2>
          <p className="text-gray-500 font-medium">Internal updates, culture, and project highlights.</p>
        </div>
        <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-gray-50 bg-gray-200" />
            ))}
            <div className="w-10 h-10 rounded-full border-4 border-gray-50 bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold">+28</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex-shrink-0" />
            <div className="flex-1 space-y-3">
                <textarea 
                    placeholder="Share a project win or shoutout..." 
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all resize-none min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                            <Camera className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                            <Users className="w-5 h-5" />
                        </button>
                    </div>
                    <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20">Post Update</button>
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-8">
        {posts.map(post => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-xl" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{post.author}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{post.time}</p>
                  </div>
                </div>
                <button className="text-gray-400">
                    <Award className={cn("w-5 h-5", post.id === 1 && "text-yellow-500")} />
                </button>
              </div>
              
              <p className="text-sm text-gray-800 leading-relaxed font-medium mb-4">
                {post.content}
              </p>

              {post.image && (
                <div className="rounded-2xl overflow-hidden mb-4 border border-gray-100">
                  <img src={post.image} alt="Project" className="w-full h-auto" />
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex space-x-6">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-bold">{post.comments}</span>
                  </button>
                </div>
                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                    <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[40px] text-white overflow-hidden relative">
         <div className="relative z-10">
            <Trophy className="w-12 h-12 text-yellow-500 mb-6" />
            <h3 className="text-2xl font-black italic tracking-tighter mb-2 italic">CREW OF THE WEEK</h3>
            <p className="text-gray-400 font-medium mb-6">Adam's Painting Force</p>
            <div className="flex items-center space-x-2">
                <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">12 Projects Finished</div>
                <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">98% Satisfied Clients</div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
      </div>
    </div>
  );
}
