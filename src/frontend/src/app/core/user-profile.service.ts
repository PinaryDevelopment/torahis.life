import { Inject, Injectable } from '@angular/core';

import { USER_PROFILE_TOKEN, BrowserStorageService } from './storage.service';

export interface UserProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string;
  expires: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(
    private storageService: BrowserStorageService,
    @Inject(USER_PROFILE_TOKEN) private userProfileStorageKey: string
  ) {}

  get(): UserProfile | null {
    const userProfileString = this.storageService.get(this.userProfileStorageKey);

    if (userProfileString === null) {
      return userProfileString;
    }

    const userProfile = JSON.parse(userProfileString) as UserProfile;

    /*
      TODO: investigate how to deal with expiration

      https://openid.net/specs/openid-connect-core-1_0.html
      "exp
        REQUIRED. Expiration time on or after which the ID Token MUST NOT be accepted for processing.
        The processing of this parameter requires that the current date/time MUST be before the expiration date/time
        listed in the value. Implementers MAY provide for some small leeway, usually no more than a few minutes,
        to account for clock skew. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z
        as measured in UTC until the date/time. See RFC 3339 [RFC3339] for details regarding date/times in general and
        UTC in particular. "

      https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/date
      "A JavaScript date is fundamentally specified as the number of milliseconds that have elapsed since midnight on
      January 1, 1970, UTC. This date and time is the same as the UNIX epoch, which is the predominant base value for
      computer-recorded date and time values."

      Also seems like the default expiration returned from Google currently is 1hr into the future. Might want to decide on a
      longer and/or sliding value for this(possibly enable refresh_token stuff).
    */
    console.log('Date.now()', Date.now());
    console.log('userProfile.expires', userProfile.expires);
    // if (userProfile.expires < Date.now()) {
    //   this.storageService.remove(this.userProfileStorageKey);
    //   return null;
    // }

    return userProfile;
  }

  set(userProfile: UserProfile): void {
    this.storageService.set(this.userProfileStorageKey, JSON.stringify(userProfile));
  }

  clear(): void {
    this.storageService.remove(this.userProfileStorageKey);
  }
}
