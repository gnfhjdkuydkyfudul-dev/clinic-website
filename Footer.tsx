
import React from 'react';
import { Link } from 'react-router-dom';
import { CLINIC_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 dark:bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-6 text-sky-400">د. عبدربه مشهور</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              خبرة علمية وعملية متميزة في جراحات القولون والمستقيم والمناظير المتقدمة بقصر العيني.
            </p>
            <div className="flex gap-4">
              <a href={`https://wa.me/20${CLINIC_INFO.whatsapp.substring(1)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.038 3.041l-.694 2.54 2.6-.681c.747.473 1.8.803 2.831.803 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.585-5.763-5.775-5.763zm3.426 8.21c-.149.418-.846.764-1.156.811-.277.041-.638.079-1.026-.047-.245-.08-1.55-.584-2.11-.832-.17-.076-.289-.138-.415-.22-.387-.253-.665-.544-.888-.87-.222-.326-.307-.643-.284-1.018.022-.375.143-.651.373-.87.23-.22.441-.301.59-.301.149 0 .284.004.375.011l.143.016c.15.011.23.023.333.242l.375.911c.038.094.072.184.102.263.076.202.124.331.023.532-.1.201-.15.301-.25.402-.1.101-.202.21-.301.301-.1.091-.214.187-.091.391.124.204.55.908 1.181 1.463.541.474 1.001.621 1.204.723.204.102.323.087.442-.053.12-.139.511-.59.651-.791.139-.201.278-.17.471-.091l1.103.543c.192.091.32.15.39.263.071.113.071.652-.078 1.071z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-r-4 border-sky-500 pr-4">ساعات العمل</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex justify-between flex-col">
                <span className="font-bold text-white">الأحد، الاثنين، الأربعاء</span>
                <span>من 05:00 م حتى انتهاء الحالات</span>
              </li>
              <li className="flex justify-between"><span>الجمعة</span> <span className="text-red-400">مغلق</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-r-4 border-sky-500 pr-4">معلومات الاتصال</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-sky-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-sky-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span dir="ltr">{CLINIC_INFO.phone}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 border-r-4 border-sky-500 pr-4">روابط سريعة</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/booking" className="hover:text-sky-400 transition-colors">نموذج الحجز</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 transition-colors">موقعنا على الخريطة</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لعيادة الدكتور عبدربه مشهور.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
