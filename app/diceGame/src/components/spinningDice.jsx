import React from 'react';

const SpinningDice = () => {
  const styles = {
    wrapper: {
      position: "relative",
      width: "200px",
      padding: "100px 0",
      margin: "0 auto",
      perspective: "1200px",
    },
    dice: {
      position: "absolute",
      width: "200px",
      height: "200px",
      transformStyle: "preserve-3d",
      animation: "spin 50s infinite linear",
    },
    side: {
      position: "absolute",
      width: "200px",
      height: "200px",
      background: "#fff",
      boxShadow: "inset 0 0 40px #ccc",
      borderRadius: "40px",
    },
    dot: {
      position: "absolute",
      width: "46px",
      height: "46px",
      borderRadius: "23px",
      background: "#444",
      boxShadow: "inset 5px 0 10px #000",
    },
    centerDot: {
      marginTop: "77px",
      marginLeft: "77px",
    },
    dtop: {
      marginTop: "20px",
    },
    dleft: {
      marginLeft: "134px",
    },
    dright: {
      marginLeft: "20px",
    },
    dbottom: {
      marginTop: "134px",
    },
    centerDleft: {
      marginTop: "77px",
      marginLeft: "20px",
    },
    centerDright: {
      marginTop: "77px",
      marginLeft: "134px",
    },
    // sides
    front: {
      transform: "translateZ(100px)",
    },
    frontInner: {
      transform: "translateZ(98px)",
    },
    back: {
      transform: "rotateX(-180deg) translateZ(100px)",
    },
    backInner: {
      transform: "rotateX(-180deg) translateZ(98px)",
    },
    right: {
      transform: "rotateY(90deg) translateZ(100px)",
    },
    rightInner: {
      transform: "rotateY(90deg) translateZ(98px)",
    },
    left: {
      transform: "rotateY(-90deg) translateZ(100px)",
    },
    leftInner: {
      transform: "rotateY(-90deg) translateZ(98px)",
    },
    top: {
      transform: "rotateX(90deg) translateZ(100px)",
    },
    topInner: {
      transform: "rotateX(90deg) translateZ(98px)",
    },
    bottom: {
      transform: "rotateX(-90deg) translateZ(100px)",
    },
    bottomInner: {
      transform: "rotateX(-90deg) translateZ(98px)",
    },
  };

  return (
    <div style={styles.wrapper}>
      <style>
        {`
          @keyframes spin {
            0% { transform: translateZ(-100px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);}
            16% { transform: translateZ(-100px) rotateX(180deg) rotateY(180deg) rotateZ(0deg);}
            33% { transform: translateZ(-100px) rotateX(360deg) rotateY(90deg) rotateZ(180deg);}
            50% { transform: translateZ(-100px) rotateX(360deg) rotateY(360deg) rotateZ(360deg);}
            66% { transform: translateZ(-100px) rotateX(180deg) rotateY(360deg) rotateZ(270deg);}
            83% { transform: translateZ(-100px) rotateX(270deg) rotateY(180deg) rotateZ(180deg);}
            100% { transform: translateZ(-100px) rotateX(360deg) rotateY(360deg) rotateZ(360deg);}
          }
        `}
      </style>
      <div style={styles.dice}>
        <div style={{ ...styles.side, ...styles.front }}>
          <div style={{ ...styles.dot, ...styles.centerDot }}></div>
        </div>
        <div style={{ ...styles.side, ...styles.frontInner }}></div>
        <div style={{ ...styles.side, ...styles.top }}>
          <div style={{ ...styles.dot, ...styles.dtop, ...styles.dleft }}></div>
          <div
            style={{ ...styles.dot, ...styles.dbottom, ...styles.dright }}
          ></div>
        </div>
        <div style={{ ...styles.side, ...styles.topInner }}></div>
        <div style={{ ...styles.side, ...styles.right }}>
          <div style={{ ...styles.dot, ...styles.dtop, ...styles.dleft }}></div>
          <div style={{ ...styles.dot, ...styles.centerDot }}></div>
          <div
            style={{ ...styles.dot, ...styles.dbottom, ...styles.dright }}
          ></div>
        </div>
        <div style={{ ...styles.side, ...styles.rightInner }}></div>
        <div style={{ ...styles.side, ...styles.left }}>
          <div style={{ ...styles.dot, ...styles.dtop, ...styles.dleft }}></div>
          <div
            style={{ ...styles.dot, ...styles.dtop, ...styles.dright }}
          ></div>
          <div
            style={{ ...styles.dot, ...styles.dbottom, ...styles.dleft }}
          ></div>
          <div
            style={{ ...styles.dot, ...styles.dbottom, ...styles.dright }}
          ></div>
        </div>
        <div style={{ ...styles.side, ...styles.leftInner }}></div>
        <div style={{ ...styles.side, ...styles.bottom }}>
          <div style={{ ...styles.dot, ...styles.centerDot }}></div>
          <div style={{ ...styles.dot, ...styles.dtop, ...styles.dleft }}></div>
          <div
            style={{ ...styles.dot, ...styles.dtop, ...styles.dright }}
          ></div>
          <div
            style={{ ...styles.dot, ...styles.dbottom, ...styles.dleft }}
          ></div>
          <div
            style={{ ...styles.dot, ...styles.dbottom, ...styles.dright }}
          ></div>
        </div>
        <div style={{ ...styles.side, ...styles.bottomInner }}></div>
        <div style={{ ...styles.side, ...styles.back }}>
          <div style={{ ...styles.dot, ...styles.dtop, ...styles.dleft }}></div>
          <div
            style={{ ...styles.dot, ...styles.dtop, ...styles.dright }}
          ></div>
          <div
            style={{ ...styles.dot, ...styles.dbottom, ...styles.dleft }}
          ></div>
          <div
            style={{ ...styles.dot, ...styles.dbottom, ...styles.dright }}
          ></div>
          <div style={{ ...styles.dot, ...styles.centerDleft }}></div>
          <div style={{ ...styles.dot, ...styles.centerDright }}></div>
        </div>
        <div style={{ ...styles.side, ...styles.backInner }}></div>
      </div>
    </div>
  );
};

export default SpinningDice;