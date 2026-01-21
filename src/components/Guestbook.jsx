import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

const MESSAGES_PER_PAGE = 10;

function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(MESSAGES_PER_PAGE);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'guestbook'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim() || !password.trim()) {
      alert('이름, 비밀번호, 메시지를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'guestbook'), {
        name: name.trim(),
        message: message.trim(),
        password: password.trim(),
        createdAt: serverTimestamp(),
      });

      setName('');
      setPassword('');
      setMessage('');
      alert('축하 메시지가 등록되었습니다.');
    } catch (error) {
      console.error('Error adding message:', error);
      alert('메시지 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || !deletePassword.trim()) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (deleteTarget.password !== deletePassword.trim()) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await deleteDoc(doc(db, 'guestbook', deleteTarget.id));
      alert('메시지가 삭제되었습니다.');
      setDeleteTarget(null);
      setDeletePassword('');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + MESSAGES_PER_PAGE);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const visibleMessages = messages.slice(0, visibleCount);
  const hasMore = messages.length > visibleCount;

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-md mx-auto">
        <h2 className="font-serif text-2xl text-primary text-center mb-4">방명록</h2>
        <p className="text-center text-gray-600 text-sm mb-8">
          축하의 메시지를 남겨주세요.
        </p>

        {/* 메시지 입력 폼 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              maxLength={10}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              maxLength={4}
            />
          </div>
          <textarea
            placeholder="축하 메시지를 남겨주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
            rows={3}
            maxLength={200}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-400">{message.length}/200</span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>

        {/* 메시지 개수 */}
        {messages.length > 0 && (
          <p className="text-xs text-gray-500 mb-4 text-right">
            총 {messages.length}개의 메시지
          </p>
        )}

        {/* 메시지 목록 */}
        <div className="space-y-4">
          {visibleMessages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-800">{msg.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{formatDate(msg.createdAt)}</span>
                  <button
                    onClick={() => setDeleteTarget(msg)}
                    className="text-xs text-gray-400 hover:text-red-500 transition"
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{msg.message}</p>
            </div>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="w-full mt-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
          >
            더 보기 ({messages.length - visibleCount}개 더)
          </button>
        )}

        {messages.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            아직 등록된 메시지가 없습니다.
          </p>
        )}

        {/* 삭제 확인 모달 */}
        {deleteTarget && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">메시지 삭제</h3>
              <p className="text-sm text-gray-600 mb-4">
                삭제하려면 비밀번호를 입력해주세요.
              </p>
              <input
                type="password"
                placeholder="비밀번호"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary mb-4"
                maxLength={4}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setDeleteTarget(null);
                    setDeletePassword('');
                  }}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Guestbook;
