import React, { useState, useEffect } from 'react';

const questions = [
    {
        question: "What action did GSOC demand NYU take regarding international and immigrant community members?",
        answers: ["Provide free legal assistance for student visa renewals", "Prevent governmental agencies from targeting them based on immigration status", "Offer them automatic tuition waivers", "Grant permanent residency to all international students"],
        correct: 1,
        explanation: "GSOC specifically called on NYU to honor a section of the union’s 2021 collective bargaining agreement detailing the university’s commitment “regarding the protection of the privacy” of all community members."
    },
    {
        question: "What is the name of the NYU student group calling for the university to cut ties with Nike?",
        answers: ["Students Against Corporate Exploitation", "NYU Labor Rights Association", "Students for International Labor Solidarity", "NYU Sunrise"],
        correct: 2,
        explanation: "Members of Students for International Labor Solidarity reiterated that NYU leadership cut the university’s contract with Nike, following almost four-year-old allegations of wage theft at a Thailand factory that supplies the NYU Bookstore with Nike-branded merchandise."
    },
    {
        question: "What did former NYU College Republicans president Kaya Walker call Barron Trump?",
        answers: ["A future NYU Republican president", "A political anomaly", "A popular first-uear", "An oddity on campus"],
        correct: 3,
        explanation: "Former club president Kaya Walker told Vanity Fair that President Donald Trump’s son has been subject to excessive attention since enrolling in the university last fall."
    },
    {
        question: "Which action group sponsored the Presidents' Day demonstration?",
        answers: ["National Immigration Alliance", "National Association of the Latino State Chambers of Congress", "Rise and Resist", "Revolution Now"],
        correct: 2,
        explanation: "Sponsored by direct action group Rise and Resist, the rally was one of several held in major cities across the country titled “Not My President’s Day.” "
    },
    {
        question: "Why were the nurses fired at NYU Langone Hospital—Brooklyn in 2022?",
        answers: ["They were caught stealing medications", "They failed to assist a woman who gave birth in a hallway", "They were accused of patient neglect", "They were caught falsifying patient records"],
        correct: 1,
        explanation: "In December 2022, administrators at NYU Langone Hospital—Brooklyn fired its entire labor and delivery staff for not intervening when a woman got lost in the building and gave birth in a walkway outside of the hospital’s labor and delivery unit."
    },
    {
        question: "Where did the Stern School of Business launch its new MBA program?",
        answers: ["NYU Abu Dhabi", "NYU Shanghai", "NYU London", "NYU Paris"],
        correct: 0,
        explanation: "This collaboration between the Abu Dhabi campus and offers a one-year MBA program with an inaugural cohort of 54 students. "
    },
    {
        question: "What did NYU spokesperson John Beckman state regarding the university’s stance on changes in federal policies regarding DEI?",
        answers: ["NYU would not comply with federal laws", " NYU would continue offering counseling services and support groups", "NYU plans to end all DEI initiatives", "NYU would relocate to another country"],
        correct: 1,
        explanation: "In a Feb. 2 statement to WSN, NYU spokesperson John Beckman said the university is “closely monitoring emerging federal policies on all matters related to higher education” and will continue to offer counseling services, support groups and listening sessions to community members."
    },
    {
        question: "What was on the CIA’s reserved table at the start of internship fair?",
        answers: ["A petition for students to sign in favor of the CIA’s work", "A video of CIA operations", "Nothing", "A QR code for students to send their Handshake profiles"],
        correct: 3,
        explanation: "Organizers cleared the table within the first hour of the event, which was set to last until 3 p.m.."
    },
    {
        question: "Which NYU school runs science and tech summer programs for K-12 students?",
        answers: ["College of Arts & Science", "Courant Institute of Mathematical Sciences", "Tandon School of Engineering", "School of Professional Studies"],
        correct: 2,
        explanation: "Run by the Tandon School of Engineering’s Center for K12 STEM Education, the programs received just over 2,800 applications in 2023 — jumping to around 4,800 in 2024."
    },
    {
        question: "What is the main reason Kenyon Chapman, a forming housing manager, is suing NYU?",
        answers: ["Violation of labor rights", "Religious discrimination regarding the university’s COVID-19 vaccine mandate", "Unfair dismissal after a family emergency", "For discrimination based on sexual orientation"],
        correct: 1,
        explanation: " In a lawsuit filed on Jan. 22, Chapman claimed that his termination violated civil rights laws and was “done with malice.” The suit is scheduled to go to court in April."
    }
];

const Quiz = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [explanation, setExplanation] = useState('');

    const explanationDisplayTime = 5000;

    useEffect(() => {
        if (!isAnswered) return;

        const timeout = setTimeout(() => {
            setIsAnswered(false);
            setExplanation('');
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setIsFinished(true);
            }
        }, explanationDisplayTime);

        return () => clearTimeout(timeout);
    }, [currentIndex, isAnswered]);

    const handleAnswer = (answerIndex) => {
        setAnswers(prev => ({
            ...prev,
            [currentIndex]: answerIndex
        }));
        setExplanation(questions[currentIndex].explanation);
        setIsAnswered(true);
    };

    const handleSkip = () => {
        clearTimeout()
        setIsAnswered(false)
        setExplanation('');
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    const getIndicatorClass = (index) => {
        if (answers[index] !== undefined) {
            return answers[index] === questions[index].correct ? 'correct' : 'incorrect';
        }
        return index === currentIndex ? 'active' : '';
    };

    return (
        <div className="quiz-wrapper">
            <div className="quiz-container">
                {!isStarted ? (
                    <div className="screen start-screen">
                        <h1 className="quiz-title">WSN Monthly News Quiz</h1>
                        <p className="quiz-description">February 2025</p>
                        <button className="main-button start-button" onClick={() => setIsStarted(true)}>
                            Start Quiz
                        </button>
                    </div>
                ) : isFinished ? (
                    <div className="screen results-screen">
                        <h2 className="quiz-title">Quiz Complete!</h2>
                        <p className="quiz-description">
                            Score: {Object.entries(answers).reduce((score, [index, answer]) =>
                                score + (answer === questions[parseInt(index)].correct ? 1 : 0), 0
                            )} out of {questions.length}
                        </p>
                        <div className="question-indicator-container">
                            <div className="question-indicator">
                                {questions.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`indicator-dot ${getIndicatorClass(index)}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="question-card">
                        <div className="question-header">
                            <div className="question-indicator-container">
                                <div className="question-indicator">
                                    {questions.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`indicator-dot ${getIndicatorClass(index)}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="question-text">
                            {questions[currentIndex].question}
                        </div>
                         {isAnswered && (
                            <div className="explanation">
                                {explanation}
                            </div>
                        )}

                        <div className="answers-container">
                            {questions[currentIndex].answers.map((answer, index) => (
                                <button
                                    key={index}
                                    className={`answer-button ${
                                        answers[currentIndex] !== undefined
                                            ? index === questions[currentIndex].correct
                                                ? 'correct'
                                                : answers[currentIndex] === index
                                                    ? 'incorrect'
                                                    : ''
                                            : ''
                                    }`}
                                    onClick={() => handleAnswer(index)}
                                    aria-label={`Answer: ${answer}`}
                                    disabled={isAnswered}
                                >
                                    {answer}
                                </button>
                            ))}
                        </div>

                        {isAnswered && (
                           <div className="skip-container">
                                <button className="skip-button" onClick={handleSkip}>Skip Explanation</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style jsx>{`
                :root {
                    --primary-color: #ED1C24;
                    --secondary-color: #ED1C24;
                    --text-color: #fff;
                    --bg-color: #1a1a1a;
                    --spacing-small: min(2vh, 20px);
                    --spacing-medium: min(3vh, 30px);
                    --indicator-dot-size: min(5vh, 40px);
                }

                .quiz-wrapper {
                    width: 100vw;
                    height: 100vh;
                    background: #000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }

                .quiz-container {
                    width: 100%;
                    height: 100%;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                }

                .screen {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: var(--spacing-medium);
                    padding: var(--spacing-medium);
                    box-sizing: border-box;
                    text-align: center; /* Center text within the screen */
                }

                .quiz-title {
                    font-size: min(8vh, 4rem);
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin: 0;
                    background: linear-gradient(45deg, #fff, #888);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 2px 10px rgba(255,255,255,0.1);
                }

                .quiz-description {
                    font-size: min(3vh, 1.5rem);
                    color: #888;
                    margin: var(--spacing-small) 0 calc(var(--spacing-medium) * 1.333);
                }

                .question-card {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    padding: var(--spacing-medium);
                    box-sizing: border-box;
                }

                .question-header {
                    flex: 0 1 auto; /* Added flex settings for better scaling */
                    max-height: 15vh; /* Adjusted max height */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                }

                .question-indicator-container {
                    width: 100%; /* Adjusted container width */
                    display: flex;
                    justify-content: center;
                    overflow-x: auto; /* Enable horizontal scrolling */
                    padding: 0 var(--spacing-small);
                }

                .question-indicator {
                    display: flex;
                    gap: min(2vw, 10px); /* Reduced gap */
                    width: fit-content; /* Make the indicator expand as needed */
                    padding: var(--spacing-small) 0;
                }

                .indicator-dot {
                    width: var(--indicator-dot-size);
                    height: var(--indicator-dot-size);
                    border-radius: 50%;
                    border: min(0.5vh, 4px) solid transparent;
                    background-color: #333;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    flex-shrink: 0; /* Prevent dots from shrinking */
                }

                .indicator-dot.active {
                    border-color: #fff;
                    transform: scale(1.1);
                    box-shadow: 0 0 20px rgba(255,255,255,0.2);
                }

                .indicator-dot.correct {
                    background-color: #2ecc71 !important;
                    border-color: #27ae60 !important;
                }

                .indicator-dot.incorrect {
                    background-color: #e74c3c !important;
                    border-color: #c0392b !important;
                }

                .question-text {
                    flex: 1 1 auto; /* Added flex settings for better scaling */
                    font-size: min(5vh, 2.5rem);
                    font-weight: 700;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 5vw;
                    line-height: 1.4;
                }

                .answers-container {
                    flex: 1 1 auto; /* Added flex settings for better scaling */
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: var(--spacing-medium);
                    padding: var(--spacing-medium);
                }

                .answer-button {
                    min-height: min(20vh, 160px);
                    padding: var(--spacing-small);
                    font-size: min(3vh, 1.4rem);
                    border: none;
                    border-radius: var(--spacing-small);
                    background: linear-gradient(145deg, #222, #333);
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    font-weight: 600;
                }

                .answer-button:not(:disabled):hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(255,255,255,0.1);
                    background: linear-gradient(145deg, #333, #444);
                }

                .answer-button.correct {
                    background: linear-gradient(145deg, #25a55f, #2ecc71);
                   
                }

                .answer-button.incorrect {
                    background: linear-gradient(145deg, #c0392b, #e74c3c);
                }

                .main-button {
                    padding: var(--spacing-small) calc(var(--spacing-medium) * 1.333);
                    font-size: min(3vh, 1.4rem);
                    border: none;
                    border-radius: var(--spacing-small);
                    background: linear-gradient(145deg, var(--primary-color), var(--secondary-color));
                    color: var(--text-color);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }

                .main-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(52,152,219,0.3);
                }

                .explanation {
                    margin-top: var(--spacing-small);
                    font-style: italic;
                    color: #bbb;
                    text-align: center;
                    padding: 0 5vw;
                    font-size: min(3vh, 1.2rem);
                }

               .skip-container {
                    display: flex;
                    justify-content: center;
                    margin-top: var(--spacing-small);

                }

                .skip-button {
                  padding: var(--spacing-small) calc(var(--spacing-medium) * 1.333);
                    font-size: min(3vh, 1.4rem);
                    border: none;
                    border-radius: var(--spacing-small);
                    background: linear-gradient(145deg, #444, #555);
                    color: var(--text-color);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                  margin-left: 8px;
                   margin-right: 8px;
                  }

                @keyframes pulseGreen {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }

                @keyframes pulseRed {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }

                @media (max-width: 768px) {
                    .answers-container {
                        grid-template-columns: 1fr;
                    }

                    .answer-button {
                        min-height: min(15vh, 120px);
                    }

                    .question-text {
                        font-size: min(4vh, 2rem);
                    }

                    .question-indicator-container {
                        padding: 0;
                    }

                    .question-indicator {
                        gap: min(1vw, 5px);
                        padding: var(--spacing-small);
                    }

                    .indicator-dot {
                        width: calc(var(--indicator-dot-size) * 0.75);
                        height: calc(var(--indicator-dot-size) * 0.75);
                    }

                    .question-header {
                        max-height: 20vh;
                    }

                    .screen {
                       text-align: left;
                    }

                    .explanation {
                        font-size: min(2.5vh, 1rem);
                    }
                }
            `}</style>
        </div>
    );
};

export default Quiz;