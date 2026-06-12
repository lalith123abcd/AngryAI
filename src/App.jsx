import { useState } from "react";

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a0a0a 0%, #2d0f0f 50%, #1a0a0a 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: "white",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "680px",
    background: "linear-gradient(160deg, #1f0b0b 0%, #2a1010 100%)",
    border: "1px solid #c0392b44",
    borderRadius: "20px",
    padding: "35px 30px",
    textAlign: "center",
    boxShadow: "0 0 60px #c0392b33, 0 0 120px #c0392b11",
  },
  title: {
    fontSize: "2.4rem",
    fontWeight: "900",
    color: "#ff4444",
    margin: "0 0 4px 0",
    textShadow: "0 0 20px #ff4444aa",
    letterSpacing: "1px",
  },
  subtitle: {
    color: "#ff8888",
    fontSize: "0.9rem",
    marginBottom: "28px",
    opacity: 0.8,
  },
  label: {
    display: "block",
    textAlign: "left",
    fontSize: "0.75rem",
    color: "#ff9999",
    marginBottom: "5px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid #c0392b55",
    background: "#1a0000",
    color: "white",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    padding: "13px 28px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #c0392b, #e74c3c)",
    color: "white",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 15px #c0392b66",
    transition: "all 0.2s",
  },
  secondaryButton: {
    padding: "13px 28px",
    border: "1px solid #c0392b88",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    background: "transparent",
    color: "#ff8888",
    marginLeft: "14px",
    transition: "all 0.2s",
  },
  statBox: {
    background: "#2a0a0a",
    border: "1px solid #c0392b33",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "14px",
    textAlign: "left",
  },
  statLabel: {
    fontSize: "0.7rem",
    color: "#ff8888",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#ff4444",
  },
  resultBox: {
    marginTop: "20px",
    background: "#2a0808",
    border: "1px solid #c0392b66",
    padding: "18px",
    borderRadius: "12px",
    textAlign: "left",
  },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    marginBottom: "8px",
    borderRadius: "8px",
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "all 0.15s",
    textAlign: "left",
    color: "#ffcccc",
    userSelect: "none",
  },
  checkLabelSelected: {
    background: "#3a0f0f",
    border: "1px solid #c0392b88",
    color: "white",
  },
  divider: {
    borderColor: "#c0392b22",
    margin: "22px 0",
  },
  birdEmoji: {
    fontSize: "3rem",
    display: "block",
    marginBottom: "6px",
  },
  loadingItem: {
    color: "#ff8888",
    fontSize: "0.85rem",
    padding: "4px 0",
  },
};

const PUNISHMENTS = [
  { id: "Situps", label: "💪 Situps", result: "100 Situps — no breaks, no mercy." },
  { id: "Pushups", label: "🏋️ Pushups", result: "50 Pushups — chest to floor, every rep." },
  { id: "Apology Letter", label: "✉️ Apology Letter", result: "Write a 2-page handwritten apology letter." },
  { id: "1000 Sorries", label: "🙏 1000 Sorries", result: "Say sorry 1000 times out loud." },
];

export default function App() {
  const [step, setStep] = useState("home");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const [blocks, setBlocks] = useState(20);
  const [sorries, setSorries] = useState(10000);
  const [punishments, setPunishments] = useState(100);

  const [selectedPunishments, setSelectedPunishments] = useState([]);
  const [customPunishment, setCustomPunishment] = useState("");
  const [generatedPunishments, setGeneratedPunishments] = useState([]);

  const togglePunishment = (id) => {
    setSelectedPunishments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const LOADING_STEPS = [
    "Loading betrayal dataset...",
    "Scanning blocks...",
    "Counting sorries...",
    "Running anger analysis...",
    "Generating verdict...",
  ];

  const trainModel = () => {
    setLoading(true);
    setLoadingStep(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLoadingStep(i);
      if (i >= LOADING_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          setStep("question");
        }, 600);
      }
    }, 550);
  };

  const generatePunishment = () => {
    const results = PUNISHMENTS.filter((p) => selectedPunishments.includes(p.id));
    setGeneratedPunishments(results.map((p) => p.result));
  };

  const unblockProb = Math.min(99, Math.floor(sorries / 1000 + 90 - blocks));

  if (step === "success") {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <span style={styles.birdEmoji}>🐦‍🔥</span>
          <h1 style={styles.title}>UNBLOCKED</h1>
          <p style={styles.subtitle}>AngryBirdAI — Mission Complete</p>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Blocks Survived</div>
            <div style={styles.statValue}>{blocks}</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Sorries Delivered</div>
            <div style={styles.statValue}>{sorries}</div>
          </div>
          <h2 style={{ color: "#4ade80", marginTop: "20px" }}>Friendship Restored ✅</h2>
          <p style={{ color: "#aaa", fontSize: "0.85rem" }}>AngryBirdAI v1.0 · Case Closed</p>
        </div>
      </div>
    );
  }

  if (step === "recovery") {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <span style={styles.birdEmoji}>😤</span>
          <h1 style={styles.title}>STILL BLOCKED</h1>
          <p style={styles.subtitle}>AngryBirdAI — Recovery Protocol Activated</p>

          <h2 style={{ color: "#ff8888", fontSize: "1rem", marginBottom: "14px" }}>
            Select Punishments (pick as many as you want)
          </h2>

          {PUNISHMENTS.map((p) => {
            const checked = selectedPunishments.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => togglePunishment(p.id)}
                style={{
                  ...styles.checkLabel,
                  ...(checked ? styles.checkLabelSelected : {}),
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {}}
                  style={{ accentColor: "#c0392b", width: "16px", height: "16px", pointerEvents: "none" }}
                />
                {p.label}
              </div>
            );
          })}

          <button
            style={{ ...styles.button, width: "100%", marginTop: "8px", opacity: selectedPunishments.length === 0 ? 0.5 : 1 }}
            onClick={generatePunishment}
            disabled={selectedPunishments.length === 0}
          >
            Generate Sentence 🔥{selectedPunishments.length > 0 ? ` (${selectedPunishments.length} selected)` : ""}
          </button>

          {generatedPunishments.length > 0 && (
            <div style={styles.resultBox}>
              <div style={styles.statLabel}>
                AngryBirdAI Verdict — {generatedPunishments.length} Punishment{generatedPunishments.length > 1 ? "s" : ""}
              </div>
              {generatedPunishments.map((g, i) => (
                <p key={i} style={{ color: "white", fontWeight: "700", marginTop: "8px", fontSize: "1rem", borderBottom: i < generatedPunishments.length - 1 ? "1px solid #c0392b33" : "none", paddingBottom: "8px" }}>
                  {i + 1}. {g}
                </p>
              ))}
              <p style={{ color: "#ff8888", fontSize: "0.8rem", marginTop: "10px" }}>⭐⭐⭐⭐ Difficulty · Approved ✅</p>
            </div>
          )}

          <hr style={styles.divider} />

          <h2 style={{ color: "#ff8888", fontSize: "0.95rem", marginBottom: "12px" }}>
            Propose a Custom Punishment
          </h2>
          <label style={styles.label}>Your idea</label>
          <input
            type="text"
            placeholder="e.g. No games for a week..."
            value={customPunishment}
            onChange={(e) => setCustomPunishment(e.target.value)}
            style={styles.input}
          />
          <button
            style={{ ...styles.button, width: "100%" }}
            onClick={() => {
              if (customPunishment.trim()) {
                alert("Custom Punishment Submitted ✅\n\n" + customPunishment);
              }
            }}
          >
            Submit Punishment
          </button>
        </div>
      </div>
    );
  }

  if (step === "question") {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <span style={styles.birdEmoji}>🐦</span>
          <h1 style={styles.title}>AngryBirdAI</h1>
          <p style={styles.subtitle}>Prediction Engine v1.0</p>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Unblock Probability</div>
            <div style={styles.statValue}>{unblockProb}%</div>
          </div>
          <h2 style={{ fontSize: "1.2rem", margin: "20px 0 18px", color: "#ffcccc" }}>
            Will you unblock me? 🥺
          </h2>
          <div>
            <button style={styles.button} onClick={() => setStep("success")}>YES ❤️</button>
            <button style={styles.secondaryButton} onClick={() => setStep("recovery")}>NO 😤</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.birdEmoji}>🐦‍🔥</span>
        <h1 style={styles.title}>AngryBirdAI</h1>
        <p style={styles.subtitle}>Friendship Recovery Engine · v1.0</p>

        <label style={styles.label}>Times Blocked</label>
        <input type="number" value={blocks} onChange={(e) => setBlocks(e.target.value)} style={styles.input} placeholder="e.g. 20" />

        <label style={styles.label}>Sorries Sent</label>
        <input type="number" value={sorries} onChange={(e) => setSorries(e.target.value)} style={styles.input} placeholder="e.g. 10000" />

        <label style={styles.label}>Punishments Completed</label>
        <input type="number" value={punishments} onChange={(e) => setPunishments(e.target.value)} style={styles.input} placeholder="e.g. 100" />

        <button style={{ ...styles.button, width: "100%", marginTop: "4px" }} onClick={trainModel} disabled={loading}>
          {loading ? "Training..." : "Run AngryBirdAI 🔥"}
        </button>

        {loading && (
          <div style={{ marginTop: "20px" }}>
            {LOADING_STEPS.map((s, i) => (
              <div key={i} style={{ ...styles.loadingItem, opacity: i < loadingStep ? 1 : 0.25, color: i < loadingStep ? "#ff8888" : "#555" }}>
                {i < loadingStep ? "✓" : "○"} {s}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}