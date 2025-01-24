package com.ssafy.sushi.global.infra.oauth.dto.google;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GoogleUserResponse {
    private String id;
    private String email;
    private String name;
    @JsonProperty("verified_email")
    private Boolean verifiedEmail;
    private String picture;
}
