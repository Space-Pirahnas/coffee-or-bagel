package main;

import (
	"net/http"
	"encoding/json"
	"log"
)

type UserResponse struct {
	Name string
	Email string
	City string
	Image string
	Interests []string
	Reviews []ReviewResponse
	Profession string
	Company string
	Bio string
	State string
}


func handleUsers(w http.ResponseWriter, req *http.Request) {
	if req.Method == http.MethodGet {
		getNearbyUsers(w, req);
	}
}

func getUser(u User) UserResponse {
	return UserResponse{
		u.Name,
		u.Email,
		getCity(u),
		getUserImage(u),
		getInterests(u),
		getReviews(u),
		u.Profession,
		u.Company,
		u.Bio,
		u.State,
	}
}

func getNearbyUsers(w http.ResponseWriter, req *http.Request ) {
	var UserResponses []UserResponse;
	var cityId Cities;
	var users []User;
	var u User;
	city := req.Header.Get("City");
	email := req.Header.Get("Email");
	log.Println(email, city, "hiiii test");
	db.Where(&User{Email: email}).First(&u);
	if (len(city) > 0 && email == u.Email) {
		db.Where(&Cities{City_Name : city}).First(&cityId);
		db.Where(&User{CitiesID: cityId.ID}).Find(&users);
		users = filterSaves(u, filterFriends(u, filterRejects(u, users)));
		for _, v := range users {
			res := getUser(v);
			UserResponses = append(UserResponses, res);
		}
		r, _ := json.Marshal(UserResponses);
		w.Write(r);
	} else {
		badRequest(w, "bad get request", http.StatusBadRequest);
	}
}

func filterRejects(u User, users []User) []User {
	var filtered []User;
	for _,v := range users {
		if v.Email != u.Email && checkReject(u, v) {
			filtered = append(filtered, v)
		}
	}
	return filtered;
}