"use client";
import React from "react";

function MainComponent() {
  const [theme, setTheme] = React.useState("light");
  const [fortune, setFortune] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showDetails, setShowDetails] = React.useState(false);
  const [animationComplete, setAnimationComplete] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("lucky");
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [pastFortunes, setPastFortunes] = React.useState([]);
  const [showHistory, setShowHistory] = React.useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const [userNickname, setUserNickname] = React.useState("");
  const [userHobby, setUserHobby] = React.useState("");
  const [userGender, setUserGender] = React.useState("");

  // Mock data for food recommendations and fortunes
  const data = {
    foods: [
      {
        name: "ラーメン",
        reason: "その温かさがあなたの今日のエネルギーバランスを整えるでしょう",
        avoid: false,
        image: "🍜",
        details:
          "ラーメンの温かいスープは心を落ち着かせ、あなたの気の流れを整えます。特に醤油や味噌ベースのものがおすすめです。",
      },
      {
        name: "寿司",
        reason: "新鮮な食材があなたの判断力を明晰にするでしょう",
        avoid: false,
        image: "🍣",
        details:
          "寿司に使われる新鮮な魚は脳の活性化を促し、重要な決断をする日には特に効果的です。マグロやサーモンを含むものを選びましょう。",
      },
      {
        name: "パスタ",
        reason: "心地よい炭水化物が不確かな時に安心感を与えるでしょう",
        avoid: false,
        image: "🍝",
        details:
          "パスタに含まれる炭水化物は、セロトニンの分泌を促し、精神的な安定をもたらします。トマトソースを選ぶと、さらに効果的です。",
      },
      {
        name: "カレー",
        reason: "スパイスがあなたの創造的思考を刺激するでしょう",
        avoid: false,
        image: "🍛",
        details:
          "カレーに含まれるターメリックやクミンなどのスパイスは、脳の創造的な部分を活性化させ、新しいアイデアを生み出す手助けをします。",
      },
      {
        name: "サラダ",
        reason: "新鮮な野菜があなたの精神を浄化するでしょう",
        avoid: false,
        image: "🥗",
        details:
          "色とりどりの野菜は、体内の毒素を排出し、精神をクリアにします。特に緑の葉物野菜は、あなたの気の流れを整えるでしょう。",
      },
      {
        name: "スープ",
        reason: "栄養たっぷりのスープがあなたの直感力を強めるでしょう",
        avoid: false,
        image: "🍲",
        details:
          "スープに含まれる液体と栄養素は、あなたの第六感を強化し、直感的な判断力を高めます。特に根菜類を含むスープが効果的です。",
      },
      {
        name: "ステーキ",
        reason: "タンパク質が今後の課題に立ち向かう力を与えるでしょう",
        avoid: false,
        image: "🥩",
        details:
          "良質なタンパク質は体に力を与え、困難な状況に立ち向かうエネルギーを提供します。適度な量を食べることで、バランスを保ちましょう。",
      },
      {
        name: "タコス",
        reason: "様々な味わいが多角的な視点をもたらすでしょう",
        avoid: false,
        image: "🌮",
        details:
          "タコスの多様な具材と味は、物事を多角的に見る能力を高めます。複雑な問題に直面している時に特に効果的です。",
      },
      {
        name: "ピザ",
        reason:
          "みんなで分け合う食べ物があなたの人間関係に調和をもたらすでしょう",
        avoid: false,
        image: "🍕",
        details:
          "ピザは共有する食べ物であり、人間関係の絆を強化します。今日は大切な人と一緒に食事をすることで、より良い結果が得られるでしょう。",
      },
      {
        name: "スムージー",
        reason: "フルーツのブレンドがあなたのチャクラを整えるでしょう",
        avoid: false,
        image: "🥤",
        details:
          "様々なフルーツをブレンドしたスムージーは、体のエネルギーセンターを活性化させ、全体的なバランスを整えます。特に朝に飲むと効果的です。",
      },
      {
        name: "コーヒー",
        reason: "不安を増幅させ、バランスを乱す可能性があります",
        avoid: true,
        image: "☕",
        details:
          "今日はコーヒーのカフェインがあなたの神経系を過剰に刺激し、不安や落ち着きのなさを引き起こす可能性があります。代わりにハーブティーを選びましょう。",
      },
      {
        name: "揚げ物",
        reason: "重い油分が今日のあなたの判断力を曇らせるかもしれません",
        avoid: true,
        image: "🍤",
        details:
          "揚げ物の重い油分は消化に負担をかけ、エネルギーを消化に使ってしまうため、精神的な明晰さが必要な今日は避けた方が良いでしょう。",
      },
      {
        name: "辛い食べ物",
        reason: "不必要にあなたの感情を刺激するかもしれません",
        avoid: true,
        image: "🌶️",
        details:
          "辛い食べ物は火のエネルギーを持ち、今日のあなたの感情バランスを乱す可能性があります。特に重要な対人関係の場面がある場合は避けましょう。",
      },
      {
        name: "甘いもの",
        reason: "糖分の急降下があなたの意思決定に影響するかもしれません",
        avoid: true,
        image: "🍰",
        details:
          "甘いものによる血糖値の急上昇と急降下は、あなたの集中力と判断力に悪影響を与える可能性があります。特に午後に食べることは避けましょう。",
      },
      {
        name: "アルコール",
        reason: "あなたの直感的なガイダンスとの繋がりを断ち切るでしょう",
        avoid: true,
        image: "🍷",
        details:
          "アルコールは第六感を鈍らせ、宇宙からのメッセージを受け取る能力を低下させます。今日は特にクリアな意識を保つことが重要です。",
      },
      {
        name: "ファストフード",
        reason:
          "加工された食材があなたのエネルギーの流れを妨げるかもしれません",
        avoid: true,
        image: "🍔",
        details:
          "ファストフードに含まれる添加物や加工された成分は、あなたのエネルギー経路を詰まらせ、気の流れを妨げる可能性があります。",
      },
      {
        name: "赤身肉",
        reason: "軽やかさが必要な時に重すぎるかもしれません",
        avoid: true,
        image: "🥩",
        details:
          "赤身肉は消化に時間がかかり、今日必要とされる精神的な軽やかさと機敏さを妨げる可能性があります。代わりに軽い食事を選びましょう。",
      },
      {
        name: "乳製品",
        reason: "今日のあなたの思考プロセスを遅くするかもしれません",
        avoid: true,
        image: "🧀",
        details:
          "乳製品は多くの人にとって消化が遅く、思考の明晰さを曇らせる可能性があります。特に重要な決断をする日には避けた方が良いでしょう。",
      },
    ],
    directions: [
      "今日は南東方向を避けましょう。あなたのエネルギーがこの方向と衝突します。",
      "東方向は明晰さと機会をもたらします。柑橘系の果物を食べることを検討してみてください。",
      "西方向は誤解を招くかもしれません。保護のために青い何かを持ち歩きましょう。",
      "北方向は今日あなたに力をもたらします。温かい食べ物を食べましょう。",
      "南方向は幸運をもたらします。幸運のために赤い何かを身につけましょう。",
      "北東方向は今日の重要な会話に吉兆です。",
      "南西方向は重要な決断を避けるべきです。",
      "北西方向は予期せぬ洞察をもたらすでしょう。驚きに対してオープンでいましょう。",
      "今日は北に背を向けて食事をすると消化が良くなるでしょう。",
      "今日は金属製の調理器具で料理すると食べ物のエネルギーが高まります。",
      "木製の箸を使うと食事の波動が調和します。",
      "流れる水の近くで食事をすると今日はあなたのオーラが浄化されるでしょう。",
    ],
    elements: ["木", "火", "土", "金", "水"],
    elementDescriptions: {
      木: "成長と拡大のエネルギーを持ち、新しい始まりに適しています。",
      火: "情熱と変容のエネルギーを持ち、創造的な活動に適しています。",
      土: "安定と養育のエネルギーを持ち、基盤を固める活動に適しています。",
      金: "収穫と洞察のエネルギーを持ち、整理整頓や完成に適しています。",
      水: "内省と流れのエネルギーを持ち、直感的な活動に適しています。",
    },
  };

  // クッキーを設定する関数
  const setCookie = (name, value, days) => {
    if (typeof window === "undefined") return;

    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  // クッキーを取得する関数
  const getCookie = (name) => {
    if (typeof window === "undefined") return null;

    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  // クッキーを削除する関数
  const eraseCookie = (name) => {
    if (typeof window === "undefined") return;
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  // ユーザー情報を保存する関数
  const saveUserInfo = () => {
    const info = {
      nickname: userNickname,
      hobby: userHobby,
      gender: userGender,
      createdAt: new Date().toISOString(),
    };

    setCookie("foodscope-user-info", JSON.stringify(info), 365); // 1年間保存
    setUserInfo(info);
    setShowUserInfoModal(false);
  };

  // Function to generate a new fortune
  const generateFortune = React.useCallback(() => {
    // Filter foods into lucky and avoid categories
    const luckyFoods = data.foods.filter((food) => !food.avoid);
    const avoidFoods = data.foods.filter((food) => food.avoid);

    // Randomly select one from each category
    const luckyFood = luckyFoods[Math.floor(Math.random() * luckyFoods.length)];
    const avoidFood = avoidFoods[Math.floor(Math.random() * avoidFoods.length)];

    // Randomly select a direction advice
    const direction =
      data.directions[Math.floor(Math.random() * data.directions.length)];

    // Randomly select today's element
    const todayElement =
      data.elements[Math.floor(Math.random() * data.elements.length)];
    const elementDescription = data.elementDescriptions[todayElement];

    // Create the fortune object
    const newFortune = {
      luckyFood,
      avoidFood,
      direction,
      todayElement,
      elementDescription,
      date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    };

    // 過去の占い結果を更新
    const storedFortunes = getCookie("foodscope-fortunes");
    let pastFortunesList = [];

    if (storedFortunes) {
      try {
        pastFortunesList = JSON.parse(storedFortunes);
        // 最新の占いを先頭に追加
        pastFortunesList.unshift(newFortune);
        // 最大30日分だけ保存
        if (pastFortunesList.length > 30) {
          pastFortunesList = pastFortunesList.slice(0, 30);
        }
      } catch (err) {
        console.error("Error parsing stored fortunes:", err);
        pastFortunesList = [newFortune];
      }
    } else {
      pastFortunesList = [newFortune];
    }

    // クッキーに保存（30日間有効）
    setCookie("foodscope-fortunes", JSON.stringify(pastFortunesList), 30);
    setPastFortunes(pastFortunesList);

    // 今日の占いをローカルストレージにも保存（互換性のため）
    localStorage.setItem("foodscope-fortune", JSON.stringify(newFortune));

    return newFortune;
  }, []);

  // Check if we should generate a new fortune or use the saved one
  React.useEffect(() => {
    setLoading(true);
    try {
      // Check if we're in a browser environment (for SSR compatibility)
      if (typeof window !== "undefined") {
        // Get theme preference
        const savedTheme = localStorage.getItem("foodscope-theme");
        if (savedTheme) {
          setTheme(savedTheme);
        }

        // ユーザー情報を取得
        const storedUserInfo = getCookie("foodscope-user-info");
        if (storedUserInfo) {
          try {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);
          } catch (err) {
            console.error("Error parsing user info:", err);
            // 初回訪問とみなしてモーダルを表示
            setShowUserInfoModal(true);
          }
        } else {
          // 初回訪問の場合、ユーザー情報入力モーダルを表示
          setShowUserInfoModal(true);
        }

        // 過去の占い結果を取得
        const storedFortunes = getCookie("foodscope-fortunes");
        if (storedFortunes) {
          try {
            const parsedFortunes = JSON.parse(storedFortunes);
            setPastFortunes(parsedFortunes);

            // 最新の占い結果を取得
            if (parsedFortunes.length > 0) {
              const latestFortune = parsedFortunes[0];
              const savedDate = latestFortune.date;
              const today = new Date().toISOString().split("T")[0];

              // 今日の占いがまだなければ新しく生成
              if (savedDate !== today) {
                const newFortune = generateFortune();
                setFortune(newFortune);
              } else {
                // 今日の占いがすでにあれば使用
                setFortune(latestFortune);
              }
            } else {
              // 過去の占いがない場合は新しく生成
              const newFortune = generateFortune();
              setFortune(newFortune);
            }
          } catch (err) {
            console.error("Error parsing stored fortunes:", err);
            const newFortune = generateFortune();
            setFortune(newFortune);
          }
        } else {
          // クッキーがない場合はローカルストレージをチェック（互換性のため）
          const savedFortune = localStorage.getItem("foodscope-fortune");

          if (savedFortune) {
            const parsedFortune = JSON.parse(savedFortune);
            const savedDate = parsedFortune.date;
            const today = new Date().toISOString().split("T")[0];

            // 今日の占いがまだなければ新しく生成
            if (savedDate !== today) {
              const newFortune = generateFortune();
              setFortune(newFortune);
            } else {
              // 今日の占いがすでにあれば使用
              setFortune(parsedFortune);
              // クッキーにも保存
              setCookie(
                "foodscope-fortunes",
                JSON.stringify([parsedFortune]),
                30
              );
              setPastFortunes([parsedFortune]);
            }
          } else {
            // 保存された占いがない場合は新しく生成
            const newFortune = generateFortune();
            setFortune(newFortune);
          }
        }
      }
    } catch (err) {
      console.error("Error loading fortune:", err);
      setError("占いの読み込みに失敗しました。ページを更新してください。");
    } finally {
      setLoading(false);
      // Simulate a delay before showing the fortune card
      setTimeout(() => {
        setAnimationComplete(true);
      }, 1500);
    }
  }, [generateFortune]);

  // Function to handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("foodscope-theme", newTheme);
  };

  // Function to force a new fortune
  const refreshFortune = () => {
    setAnimationComplete(false);
    setLoading(true);
    setTimeout(() => {
      const newFortune = generateFortune();
      setFortune(newFortune);
      setLoading(false);
      setTimeout(() => {
        setAnimationComplete(true);
      }, 1000);
    }, 800); // Add a slight delay for animation effect
  };

  // Function to show modal with detailed information
  const showDetailModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  // 履歴モーダルを表示する関数
  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  // 特定の日付の占いを表示する関数
  const showFortuneFromDate = (selectedFortune) => {
    setAnimationComplete(false);
    setFortune(selectedFortune);
    setShowHistory(false);

    setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
  };

  // ヘッダー背景アニメーション用のパラメータを初期化
  const bgEmojis = React.useMemo(() => {
    const EMOJIS = ["🍜", "🍣", "🍛", "🍲", "🥗", "🍱", "🍚", "🍙", "🍵", "🥢"];
    const arr = [];
    for (let i = 0; i < 28; i++) {
      // 画面全体に満遍なく分布させるため、グリッドベース＋微ランダム
      const row = Math.floor(i / 7);
      const col = i % 7;
      arr.push({
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        top: Math.min(95, Math.max(2, row * 14 + Math.random() * 8)), // 0-100%の範囲で分布
        left: Math.min(95, Math.max(2, col * 13 + Math.random() * 8)),
        size: 1.5 + Math.random() * 2.5, // 1.5rem~4rem
        opacity: 0.18 + Math.random() * 0.22, // 0.18~0.4
        duration: 7 + Math.random() * 8, // 7~15s
        delay: Math.random() * 6, // 0~6s
        direction: Math.random() > 0.5 ? "alternate" : "alternate-reverse",
        floatX: (Math.random() - 0.5) * 30, // -15~+15px 横揺れ
        floatY: 18 + Math.random() * 22, // 18~40px 縦揺れ
      });
    }
    return arr;
  }, []);

  // If we're still loading, show a loading spinner
  if (loading) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-[#fff8f0] to-[#ffecd9] text-gray-800"
        }`}
      >
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-[#ff9d76] opacity-25"></div>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-[#ff9d76] animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
            🔮
          </div>
        </div>
        <p className="mt-6 text-lg font-medium animate-pulse">
          星に問い合わせ中...
        </p>
      </div>
    );
  }

  // If there's an error, show an error message
  if (error) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-[#fff8f0] to-[#ffecd9] text-gray-800"
        }`}
      >
        <div className="text-red-500 text-xl mb-4">
          <i className="fas fa-exclamation-circle mr-2"></i>
          エラー
        </div>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#ff9d76] text-white rounded-lg hover:bg-[#ff7e76] transition-colors duration-300 shadow-lg"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-[#fff8f0] to-[#ffecd9] text-gray-800"
      }`}
    >
      {/* Header */}
      <header className="py-6 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {bgEmojis.map((item, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                fontSize: `${item.size}rem`,
                opacity: item.opacity,
                animation: `floatY${i} ${item.duration}s ${item.direction} infinite ease-in-out`,
                animationDelay: `${item.delay}s`,
                zIndex: 1,
                filter: "blur(0.2px)",
                userSelect: "none",
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6a5acd] to-[#ff7e76] animate-fadeIn tracking-wide drop-shadow-lg">
            <i className="fas fa-utensils mr-2"></i>
            食運の星図
          </h1>
          <p className="text-lg md:text-xl opacity-80 animate-slideUp font-medium">
            {userInfo ? `${userInfo.nickname}さんの` : ""}あなたの今日の運命を読み解く
          </p>
          <div className="mt-2 inline-block bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-white border-opacity-20">
            <span className="mr-2">
              {new Date(fortune?.date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="font-bold text-[#ff9d76]">
              今日の五行: {fortune?.todayElement}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-pink-200 to-pink-300 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-orange-200 to-yellow-200 opacity-20 blur-3xl"></div>
        </div>

        {/* Fortune Card */}
        <div
          className={`w-full max-w-2xl transition-all duration-1000 transform ${
            animationComplete
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-full p-1 shadow-lg">
              <button
                onClick={() => setActiveTab("lucky")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "lucky"
                    ? "bg-white text-[#ff7e76] shadow-md"
                    : "text-gray-600 hover:bg-white hover:bg-opacity-30"
                }`}
              >
                ラッキーフード
              </button>
              <button
                onClick={() => setActiveTab("avoid")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "avoid"
                    ? "bg-white text-[#ff7e76] shadow-md"
                    : "text-gray-600 hover:bg-white hover:bg-opacity-30"
                }`}
              >
                避けるべき食べ物
              </button>
              <button
                onClick={() => setActiveTab("direction")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "direction"
                    ? "bg-white text-[#ff7e76] shadow-md"
                    : "text-gray-600 hover:bg-white hover:bg-opacity-30"
                }`}
              >
                気学アドバイス
              </button>
            </div>
          </div>

          {/* Card Content */}
          <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition-all duration-500">
            {/* Lucky Food Tab */}
            <div
              className={`transition-all duration-500 ${
                activeTab === "lucky" ? "block" : "hidden"
              }`}
            >
              <div className="relative">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#ff9d76] to-[#ff7e76] text-white px-4 py-1 rounded-bl-lg font-medium">
                  ラッキーフード
                </div>
                <div className="pt-12 px-6 pb-6">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="text-8xl mb-4 md:mb-0 md:mr-6">
                      {fortune?.luckyFood.image}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {fortune?.luckyFood.name}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {fortune?.luckyFood.reason}
                      </p>
                      <button
                        onClick={() =>
                          showDetailModal({
                            title: fortune?.luckyFood.name,
                            image: fortune?.luckyFood.image,
                            description: fortune?.luckyFood.details,
                            type: "lucky",
                          })
                        }
                        className="inline-flex items-center text-[#ff7e76] hover:text-[#ff9d76] transition-colors"
                      >
                        <span>詳細を見る</span>
                        <i className="fas fa-chevron-right ml-1 text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Avoid Food Tab */}
            <div
              className={`transition-all duration-500 ${
                activeTab === "avoid" ? "block" : "hidden"
              }`}
            >
              <div className="relative">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#ff5757] to-[#ff7e76] text-white px-4 py-1 rounded-bl-lg font-medium">
                  避けるべき食べ物
                </div>
                <div className="pt-12 px-6 pb-6">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="text-8xl mb-4 md:mb-0 md:mr-6">
                      {fortune?.avoidFood.image}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {fortune?.avoidFood.name}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {fortune?.avoidFood.reason}
                      </p>
                      <button
                        onClick={() =>
                          showDetailModal({
                            title: fortune?.avoidFood.name,
                            image: fortune?.avoidFood.image,
                            description: fortune?.avoidFood.details,
                            type: "avoid",
                          })
                        }
                        className="inline-flex items-center text-[#ff7e76] hover:text-[#ff9d76] transition-colors"
                      >
                        <span>詳細を見る</span>
                        <i className="fas fa-chevron-right ml-1 text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direction Advice Tab */}
            <div
              className={`transition-all duration-500 ${
                activeTab === "direction" ? "block" : "hidden"
              }`}
            >
              <div className="relative">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#5e9eff] to-[#7eb8ff] text-white px-4 py-1 rounded-bl-lg font-medium">
                  気学アドバイス
                </div>
                <div className="pt-12 px-6 pb-6">
                  <div className="flex flex-col items-center">
                    <div className="text-6xl mb-4">🧭</div>
                    <div className="text-center">
                      <p className="text-gray-800 text-lg mb-4">
                        {fortune?.direction}
                      </p>
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-700 mb-2">
                          今日の五行:{" "}
                          <span className="text-[#ff7e76] font-bold">
                            {fortune?.todayElement}
                          </span>
                        </h3>
                        <p className="text-gray-600">
                          {fortune?.elementDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fadeIn">
          <button
            onClick={refreshFortune}
            className="px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-[#ff9d76] to-[#ff7e76] text-white hover:shadow-lg hover:scale-105 transform active:scale-95"
          >
            <i className="fas fa-sync-alt mr-2"></i>
            新しい占いを見る
          </button>

          <button
            onClick={toggleHistoryModal}
            className="px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-[#7eb8ff] to-[#5e9eff] text-white hover:shadow-lg hover:scale-105 transform active:scale-95"
          >
            <i className="fas fa-history mr-2"></i>
            過去の占いを見る
          </button>

          <button
            onClick={toggleTheme}
            className={`px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-white text-gray-800 hover:bg-gray-100 shadow-md"
            } hover:shadow-lg`}
          >
            <i
              className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"} mr-2`}
            ></i>
            {theme === "dark" ? "ライトモード" : "ダークモード"}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center">
        <div className="max-w-md mx-auto">
          <p className="opacity-70 text-sm">
            食スコープ • {new Date().getFullYear()} •
            <span className="ml-1">
              每日の食運をチェックして、より良い一日を
            </span>
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
            <div
              className={`absolute top-0 left-0 w-full h-1 ${
                modalContent?.type === "lucky"
                  ? "bg-gradient-to-r from-[#ff9d76] to-[#ff7e76]"
                  : "bg-gradient-to-r from-[#ff5757] to-[#ff7e76]"
              }`}
            ></div>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
              onClick={() => setShowModal(false)}
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">{modalContent?.image}</span>
                <h3 className="text-xl font-bold text-gray-800">
                  {modalContent?.title}
                </h3>
              </div>
              <p className="text-gray-600">{modalContent?.description}</p>
              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={toggleHistoryModal}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-scaleIn">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7eb8ff] to-[#5e9eff]"></div>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
              onClick={toggleHistoryModal}
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                過去30日間の食スコープ
              </h3>

              <div className="overflow-y-auto max-h-[60vh] pr-2">
                {pastFortunes.length > 0 ? (
                  <div className="space-y-3">
                    {pastFortunes.map((pastFortune, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => showFortuneFromDate(pastFortune)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">
                              {pastFortune.luckyFood.image}
                            </span>
                            <div>
                              <p className="font-medium text-gray-800">
                                {new Date(pastFortune.date).toLocaleDateString(
                                  "ja-JP",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                              <p className="text-sm text-gray-600">
                                ラッキーフード: {pastFortune.luckyFood.name} |
                                五行: {pastFortune.todayElement}
                              </p>
                            </div>
                          </div>
                          <i className="fas fa-chevron-right text-gray-400"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    過去の占い結果がありません
                  </p>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                  onClick={toggleHistoryModal}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideRight {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideLeft {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animate-slideRight {
          animation: slideRight 0.8s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animate-slideLeft {
          animation: slideLeft 0.8s ease-out forwards;
          animation-delay: 0.6s;
          opacity: 0;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* ユーザー情報入力モーダル */}
      {showUserInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowUserInfoModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff9d76] to-[#ff7e76]"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                初めまして！
              </h3>
              <p className="text-gray-600 mb-6">
                より正確な食運占いのために、少しだけあなたについて教えてください。
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nickname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ニックネーム
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    value={userNickname}
                    onChange={(e) => setUserNickname(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ff9d76] focus:border-[#ff9d76] outline-none"
                    placeholder="例: たろう"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hobby"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    趣味
                  </label>
                  <input
                    type="text"
                    id="hobby"
                    value={userHobby}
                    onChange={(e) => setUserHobby(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ff9d76] focus:border-[#ff9d76] outline-none"
                    placeholder="例: 料理、読書"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    性別
                  </label>
                  <select
                    id="gender"
                    value={userGender}
                    onChange={(e) => setUserGender(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ff9d76] focus:border-[#ff9d76] outline-none"
                  >
                    <option value="">選択してください</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                    <option value="other">その他</option>
                    <option value="no-answer">回答しない</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                  onClick={() => setShowUserInfoModal(false)}
                >
                  スキップ
                </button>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-[#ff9d76] to-[#ff7e76] text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
                  onClick={saveUserInfo}
                  disabled={!userNickname}
                >
                  保存する
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                ※入力いただいた情報はお使いのブラウザにのみ保存され、サーバーには送信されません。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;