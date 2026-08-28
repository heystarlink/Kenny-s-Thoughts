import styled from "@emotion/styled"
import Image from "next/image"
import React from "react"
import { CONFIG } from "site.config"
import { FiUser } from "react-icons/fi"

type Props = {}

const ProfileCard: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <div className="title">
        <FiUser aria-hidden="true" />
        关于我
      </div>
      <div className="content">
        <div className="top">
          <Image
            src={CONFIG.profile.image}
            fill
            priority
            sizes="72px"
            alt=""
            css={{ objectFit: "cover" }}
          />
        </div>
        <div className="mid">
          <div className=" name">{CONFIG.profile.name}</div>
          <div className="role">{CONFIG.profile.role}</div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default ProfileCard

const StyledWrapper = styled.div`
  > .title {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.25rem;
    margin-bottom: 0.75rem;
  }
  > .content {
    display: flex;
    margin-bottom: 2.25rem;
    gap: 0.75rem;
    align-items: flex-start;
    width: 100%;

    .top {
      overflow: hidden;
      position: relative;
      width: 4.5rem;
      flex-shrink: 0;
      border-radius: 0.5rem;
      &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    }
    .mid {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 0;
      .name {
        margin-bottom: 0.1rem;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 700;
      }
      .role {
        margin-bottom: 0.35rem;
        font-size: 0.8125rem;
        line-height: 1.2rem;
        color: ${({ theme }) => theme.colors.gray11};
      }
    }
  }
`
