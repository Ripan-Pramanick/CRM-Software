"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface DashboardAnimationsProps {
  children: React.ReactNode
}

export function DashboardAnimations({ children }: DashboardAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasPlayedEntrance = useRef(false)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const mm = gsap.matchMedia()
      const cleanupFns: Array<() => void> = []

      mm.add(
        {
          isMotionAllowed: "(prefers-reduced-motion: no-preference)",
          isReducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isReducedMotion } = context.conditions as {
            isMotionAllowed: boolean
            isReducedMotion: boolean
          }

          const title = container.querySelector('[data-gsap="header-title"]')
          const description = container.querySelector('[data-gsap="header-desc"]')
          const headerBtns = gsap.utils.toArray<HTMLElement>('[data-gsap="header-btn"]', container)
          const kpiCards = gsap.utils.toArray<HTMLElement>('[data-gsap="kpi-card"]', container)
          const kpiIcons = gsap.utils.toArray<HTMLElement>('[data-gsap="kpi-icon"]', container)
          const kpiValues = gsap.utils.toArray<HTMLElement>('[data-gsap="kpi-value"]', container)
          const campaignsSection = container.querySelector<HTMLElement>('[data-gsap="campaigns-section"]')
          const campaignRows = gsap.utils.toArray<HTMLElement>('[data-gsap="campaign-row"]', container)
          const campaignBadges = gsap.utils.toArray<HTMLElement>('[data-gsap="campaign-badge"]', container)
          const viewAllLink = container.querySelector<HTMLElement>('[data-gsap="view-all-link"]')
          const quickNavSection = container.querySelector<HTMLElement>('[data-gsap="quick-nav-section"]')
          const quickNavItems = gsap.utils.toArray<HTMLElement>('[data-gsap="quick-nav-item"]', container)

          if (isReducedMotion) {
            gsap.set(
              [
                title,
                description,
                ...headerBtns,
                ...kpiCards,
                ...kpiIcons,
                campaignsSection,
                ...campaignRows,
                ...campaignBadges,
                quickNavSection,
                ...quickNavItems,
              ],
              { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "all" }
            )
            return
          }

          if (!hasPlayedEntrance.current) {
            hasPlayedEntrance.current = true

            const masterTl = gsap.timeline({
              defaults: { ease: "power3.out", force3D: true },
            })

            if (title) {
              masterTl.from(
                title,
                { y: 20, opacity: 0, duration: 0.55 },
                0
              )
            }

            if (description) {
              masterTl.from(
                description,
                { y: 16, opacity: 0, duration: 0.5 },
                0.12
              )
            }

            if (headerBtns.length > 0) {
              masterTl.from(
                headerBtns,
                {
                  x: 24,
                  opacity: 0,
                  duration: 0.5,
                  stagger: 0.08,
                  clearProps: "transform",
                },
                0.18
              )
            }

            if (kpiCards.length > 0) {
              masterTl.from(
                kpiCards,
                {
                  y: 35,
                  opacity: 0,
                  scale: 0.96,
                  duration: 0.6,
                  stagger: 0.09,
                  clearProps: "transform",
                },
                0.26
              )
            }

            if (kpiIcons.length > 0) {
              masterTl.from(
                kpiIcons,
                {
                  scale: 0.6,
                  opacity: 0,
                  duration: 0.45,
                  stagger: 0.09,
                  ease: "back.out(1.8)",
                  clearProps: "transform",
                },
                0.38
              )
            }

            if (campaignsSection) {
              masterTl.from(
                campaignsSection,
                { y: 28, opacity: 0, duration: 0.6, clearProps: "transform" },
                0.48
              )
            }

            if (campaignRows.length > 0) {
              masterTl.from(
                campaignRows,
                {
                  y: 16,
                  opacity: 0,
                  duration: 0.45,
                  stagger: 0.07,
                  clearProps: "transform",
                },
                0.62
              )
            }

            if (campaignBadges.length > 0) {
              masterTl.from(
                campaignBadges,
                {
                  scale: 0.82,
                  opacity: 0,
                  duration: 0.4,
                  stagger: 0.07,
                  ease: "back.out(1.5)",
                  clearProps: "transform",
                },
                0.7
              )
            }

            if (quickNavSection) {
              masterTl.from(
                quickNavSection,
                { y: 28, opacity: 0, duration: 0.6, clearProps: "transform" },
                0.54
              )
            }

            if (quickNavItems.length > 0) {
              masterTl.from(
                quickNavItems,
                {
                  y: 14,
                  opacity: 0,
                  duration: 0.42,
                  stagger: 0.07,
                  clearProps: "transform",
                },
                0.68
              )
            }
          }

          kpiValues.forEach((el) => {
            const rawTarget = Number(el.getAttribute("data-target-value") || "0")
            const counter = { val: 0 }

            ScrollTrigger.create({
              trigger: el,
              start: "top 92%",
              once: true,
              onEnter: () => {
                gsap.to(counter, {
                  val: rawTarget,
                  duration: 1.25,
                  ease: "power2.out",
                  onUpdate: () => {
                    el.textContent = Math.round(counter.val).toLocaleString()
                  },
                })
              },
            })
          })

          kpiCards.forEach((card) => {
            const icon = card.querySelector<HTMLElement>('[data-gsap="kpi-icon"]')

            const onEnter = () => {
              gsap.to(card, {
                y: -4,
                boxShadow: "0 12px 24px -6px rgba(15, 23, 42, 0.08), 0 4px 10px -3px rgba(15, 23, 42, 0.04)",
                borderColor: "rgba(203, 213, 225, 0.9)",
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              })
              if (icon) {
                gsap.to(icon, {
                  scale: 1.08,
                  duration: 0.25,
                  ease: "power2.out",
                  overwrite: "auto",
                })
              }
            }

            const onLeave = () => {
              gsap.to(card, {
                y: 0,
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                borderColor: "rgb(229, 231, 235)",
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              })
              if (icon) {
                gsap.to(icon, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto",
                })
              }
            }

            card.addEventListener("mouseenter", onEnter)
            card.addEventListener("mouseleave", onLeave)
            cleanupFns.push(() => {
              card.removeEventListener("mouseenter", onEnter)
              card.removeEventListener("mouseleave", onLeave)
            })
          })

          headerBtns.forEach((btn) => {
            const onEnter = () => {
              gsap.to(btn, {
                y: -1.5,
                scale: 1.02,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
              })
            }
            const onLeave = () => {
              gsap.to(btn, {
                y: 0,
                scale: 1,
                duration: 0.22,
                ease: "power2.out",
                overwrite: "auto",
              })
            }
            const onDown = () => {
              gsap.to(btn, {
                scale: 0.97,
                duration: 0.1,
                ease: "power2.out",
                overwrite: "auto",
              })
            }
            const onUp = () => {
              gsap.to(btn, {
                scale: 1.02,
                duration: 0.15,
                ease: "power2.out",
                overwrite: "auto",
              })
            }

            btn.addEventListener("mouseenter", onEnter)
            btn.addEventListener("mouseleave", onLeave)
            btn.addEventListener("mousedown", onDown)
            btn.addEventListener("mouseup", onUp)
            cleanupFns.push(() => {
              btn.removeEventListener("mouseenter", onEnter)
              btn.removeEventListener("mouseleave", onLeave)
              btn.removeEventListener("mousedown", onDown)
              btn.removeEventListener("mouseup", onUp)
            })
          })

          quickNavItems.forEach((item) => {
            const text = item.querySelector<HTMLElement>('[data-gsap="nav-text"]')
            const arrow = item.querySelector<HTMLElement>('[data-gsap="nav-arrow"]')

            const onEnter = () => {
              gsap.to(item, {
                backgroundColor: "rgb(249, 250, 251)",
                borderColor: "rgb(229, 231, 235)",
                duration: 0.22,
                ease: "power2.out",
                overwrite: "auto",
              })
              if (text) {
                gsap.to(text, {
                  x: 4,
                  duration: 0.22,
                  ease: "power2.out",
                  overwrite: "auto",
                })
              }
              if (arrow) {
                gsap.to(arrow, {
                  x: 3,
                  y: -3,
                  color: "rgb(37, 99, 235)",
                  duration: 0.22,
                  ease: "power2.out",
                  overwrite: "auto",
                })
              }
            }

            const onLeave = () => {
              gsap.to(item, {
                backgroundColor: "transparent",
                borderColor: "rgb(243, 244, 246)",
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              })
              if (text) {
                gsap.to(text, {
                  x: 0,
                  duration: 0.25,
                  ease: "power2.out",
                  overwrite: "auto",
                })
              }
              if (arrow) {
                gsap.to(arrow, {
                  x: 0,
                  y: 0,
                  color: "rgb(156, 163, 175)",
                  duration: 0.25,
                  ease: "power2.out",
                  overwrite: "auto",
                })
              }
            }

            item.addEventListener("mouseenter", onEnter)
            item.addEventListener("mouseleave", onLeave)
            cleanupFns.push(() => {
              item.removeEventListener("mouseenter", onEnter)
              item.removeEventListener("mouseleave", onLeave)
            })
          })

          campaignRows.forEach((row) => {
            const onEnter = () => {
              gsap.to(row, {
                x: 4,
                backgroundColor: "rgba(249, 250, 251, 0.85)",
                duration: 0.22,
                ease: "power2.out",
                overwrite: "auto",
              })
            }
            const onLeave = () => {
              gsap.to(row, {
                x: 0,
                backgroundColor: "transparent",
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              })
            }

            row.addEventListener("mouseenter", onEnter)
            row.addEventListener("mouseleave", onLeave)
            cleanupFns.push(() => {
              row.removeEventListener("mouseenter", onEnter)
              row.removeEventListener("mouseleave", onLeave)
            })
          })

          if (viewAllLink) {
            const arrow = viewAllLink.querySelector<HTMLElement>('[data-gsap="view-all-arrow"]')
            const onEnter = () => {
              if (arrow) {
                gsap.to(arrow, {
                  x: 2.5,
                  y: -2.5,
                  duration: 0.2,
                  ease: "power2.out",
                  overwrite: "auto",
                })
              }
            }
            const onLeave = () => {
              if (arrow) {
                gsap.to(arrow, {
                  x: 0,
                  y: 0,
                  duration: 0.22,
                  ease: "power2.out",
                  overwrite: "auto",
                })
              }
            }

            viewAllLink.addEventListener("mouseenter", onEnter)
            viewAllLink.addEventListener("mouseleave", onLeave)
            cleanupFns.push(() => {
              viewAllLink.removeEventListener("mouseenter", onEnter)
              viewAllLink.removeEventListener("mouseleave", onLeave)
            })
          }
        }
      )

      return () => {
        cleanupFns.forEach((fn) => fn())
        mm.revert()
      }
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="crm-dashboard-surface min-h-full">
      {children}
    </div>
  )
}