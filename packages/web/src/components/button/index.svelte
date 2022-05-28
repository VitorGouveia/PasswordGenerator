<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { generateRandomNumber } from "@password-generator/core";

  const dispatch = createEventDispatcher();

  import NeoExpertiseX from "./neo-expertise-x.svelte";

  export let variant: "solid" | "outlined" | "NeoExpertise" | "MoonKnight";
  export let label = "";
  export let classname = "";
  export let disabled = false;

  let focused = false;

  let personality: string = "steven";

  const colors = {
    startFillGradient: "hsl(260, 8%, 78%)",
    endFillGradient: "hsl(260, 8%, 30%)",

    startStrokeGradient: "hsl(260, 8%, 30%)",
    endStrokeGradient: "hsl(260, 8%, 70%)",
  };

  function MoonKnightSwitchAnimation(callback: Function) {
    const blackPanel = document.createElement("div");

    blackPanel.style.width = "1000vw";
    blackPanel.style.height = "1000vh";

    blackPanel.style.position = "absolute";
    blackPanel.style.top = "0px";
    blackPanel.style.left = "0px";
    blackPanel.style.right = "0px";
    blackPanel.style.bottom = "0px";

    document.body.style.overflow = "hidden";
    document.body.appendChild(blackPanel);

    // animation here
    const switchAudio = new Audio("/PasswordGenerator/switching-effect.mp3");
    console.log(switchAudio.duration);
    switchAudio.currentTime = 1;

    switchAudio.play();
    blackPanel.style.zIndex = "100";
    setTimeout(() => {
      blackPanel.style.background = "#000000";
      setTimeout(() => {
        blackPanel.style.background = "transparent";

        setTimeout(() => {
          blackPanel.style.background = "#000000";

          setTimeout(() => {
            blackPanel.style.background = "transparent";
            document.body.style.transform = "scale(1.3)";
            setTimeout(() => {
              blackPanel.style.background = "#000000";

              setTimeout(() => {
                blackPanel.style.background = "transparent";
                document.body.style.transform = "scale(1.1)";

                setTimeout(() => {
                  blackPanel.style.background = "#000000";

                  setTimeout(() => {
                    blackPanel.style.background = "transparent";
                    document.body.style.transform = "scale(1.5)";

                    setTimeout(() => {
                      blackPanel.style.background = "#000000";

                      setTimeout(() => {
                        blackPanel.style.background = "transparent";
                        document.body.style.transform = "scale(1.4)";

                        setTimeout(() => {
                          blackPanel.style.background = "#000000";

                          setTimeout(() => {
                            blackPanel.style.background = "transparent";
                            document.body.style.transform = "scale(1)";

                            setTimeout(() => {
                              callback();

                              document.body.removeChild(blackPanel);
                              document.body.style.overflow = "auto";

                              const manWithoutLove = new Audio(
                                "/PasswordGenerator/man-without-love.mp3"
                              );
                              manWithoutLove.play();
                            }, 500);
                          }, 130);
                        }, 66);
                      }, 100);
                    }, 33);
                  }, 66);
                }, 133);
              }, 100);
            }, 100);
          }, 60);
        }, 200);
      }, 100);
    }, 600);

    // animation here
  }

  function PaintStevenButton() {
    colors.startFillGradient = "hsl(260, 8%, 78%)";
    colors.endFillGradient = "hsl(260, 8%, 30%)";

    colors.startStrokeGradient = "hsl(260, 8%, 30%)";
    colors.endStrokeGradient = "hsl(260, 8%, 70%)";
  }

  function PaintMarcButton() {
    colors.startFillGradient = "hsl(215, 71%, 45%)";
    colors.endFillGradient = "hsl(215, 71%, 3%)";

    colors.startStrokeGradient = "hsl(215, 71%, 45%)";
    colors.endStrokeGradient = "hsl(200, 80%, 15%)";
  }

  function PaintJakeButton() {
    colors.startFillGradient = "#515151";
    colors.endFillGradient = "#000000";

    colors.startStrokeGradient = "#ADADAD";
    colors.endStrokeGradient = "#383838";
  }

  function sortRandomPersonality(rng: number) {
    if (rng === 0) {
      // marc
      PaintMarcButton();

      personality = "marc";
    } else if (rng === 1) {
      // jake
      PaintJakeButton();

      personality = "jake";
    } else {
      PaintStevenButton();

      personality = "steven";
    }
  }

  function handleClick() {
    if (variant === "MoonKnight") {
      // play moon knight animation
      // play the theme as well
      // the screen will go through a switch and after that the button moon will change

      // animation
      MoonKnightSwitchAnimation(() => {});

      setTimeout(() => {
        const RNG = () =>
          generateRandomNumber({
            min: 0,
            max: 2,
          });

        const rng = RNG();

        // sort jake or marc
        if (
          (rng === 0 && personality === "marc") ||
          (rng === 1 && personality === "jake") ||
          (rng === 2 && personality === "steven")
        ) {
          // sort again
          sortRandomPersonality(RNG());
          return;
        }

        sortRandomPersonality(rng);
      }, 1700);
    }

    dispatch("click");
  }
</script>

<button
  {disabled}
  class={`variant-${variant} ${
    variant === "MoonKnight" && `personality-${personality}`
  } ${classname}`}
  on:click={handleClick}
>
  {#if variant === "NeoExpertise"}
    <NeoExpertiseX />
  {/if}

  <slot />{label}

  {#if variant === "MoonKnight"}
    <svg
      width="20"
      height="20"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.9372 16.5079C25.6684 18.3892 24.9163 20.1722 23.75 21.6806C22.4721 23.3335 20.7498 24.5882 18.7847 25.298C16.8196 26.0078 14.693 26.1433 12.6538 25.6886C10.6145 25.2339 8.74694 24.2078 7.26956 22.7304C5.79217 21.2531 4.7661 19.3855 4.31139 17.3462C3.85669 15.307 3.99216 13.1804 4.70195 11.2153C5.41175 9.25023 6.66652 7.52794 8.31943 6.24997C9.82781 5.08375 11.6108 4.33155 13.4921 4.06281C12.4287 5.7067 11.9275 7.65775 12.0739 9.62036C12.2342 11.77 13.1607 13.7908 14.685 15.315C16.2092 16.8393 18.23 17.7658 20.3796 17.9261C22.3423 18.0725 24.2933 17.5713 25.9372 16.5079Z"
        fill="url(#paint0_radial_78_178)"
        stroke="url(#paint1_radial_78_178)"
        stroke-width="0.5"
        stroke-linecap="round"
      />

      <defs>
        <radialGradient
          id="paint0_radial_78_178"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(18.125 11.875) rotate(135) scale(18.5616)"
        >
          <stop stop-color={colors.startFillGradient} />
          <stop stop-color={colors.endFillGradient} offset="1" />
        </radialGradient>

        <radialGradient
          id="paint1_radial_78_178"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20.6643 9.33566) rotate(135) scale(24.4768)"
        >
          <stop offset="0.244632" stop-color={colors.startStrokeGradient} />
          <stop offset="0.84375" stop-color={colors.endStrokeGradient} />
        </radialGradient>
      </defs>
    </svg>
  {/if}
</button>

<style lang="scss">
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--size-100);

    color: var(--color-gray-100);
    padding: var(--size-100) var(--size-200);

    border: 4px solid var(--color-primary-900);

    box-shadow: 4px 4px 0px 0px #000;

    &:disabled {
      cursor: not-allowed;
      filter: opacity(0.5);
    }

    &:not(:disabled):hover,
    &:not(:disabled):focus,
    &:not(:disabled):active {
      box-shadow: 2px 2px 0px 0px #000;
    }

    &.variant-solid {
      color: var(--color-gray-100);
      background: var(--color-primary-600);

      &:not(:disabled):hover,
      &:not(:disabled):focus,
      &:not(:disabled):active {
        color: var(--color-gray-900);
        background: var(--color-primary-300);
      }
    }

    &.variant-MoonKnight,
    &.variant-outlined {
      box-shadow: none;
    }

    &.variant-outlined {
      color: var(--color-gray-100);
      border-color: var(--color-gray-100);
      background: transparent;

      &:hover,
      &:focus,
      &:active {
        border-color: var(--color-gray-500);
        color: var(--color-gray-500);
      }
    }

    &.variant-NeoExpertise {
      background: var(--color-neo-expertise);

      &:hover,
      &:focus,
      &:active {
        filter: brightness(1.2);
      }
    }

    &.variant-MoonKnight {
      &.personality-steven {
        border-color: var(--color-gray-100);
        background: transparent;
      }

      &.personality-jake {
        border-color: var(--color-gray-700);
        background: var(--color-gray-900);
      }

      &.personality-marc {
        border-color: var(--color-blue-400);
        background: var(--color-blue-900);
      }

      &:hover,
      &:focus,
      &:active {
        &.personality-steven {
          color: var(--color-gray-900);
          background: var(--color-gray-100);
        }
        /* background: var(--color-gray-900); */

        &.personality-jake {
          color: var(--color-gray-100);
          border-color: var(--color-gray-700);
          background: var(--color-gray-900);
        }

        &.personality-marc {
          color: var(--color-gray-100);
          border-color: var(--color-blue-400);
          background: var(--color-blue-900);
        }
      }
    }
  }
</style>
