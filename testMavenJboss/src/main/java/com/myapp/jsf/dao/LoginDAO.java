package com.myapp.jsf.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.faces.bean.ManagedBean;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;

import org.jboss.tools.examples.data.MemberRepository;
import org.jboss.tools.examples.model.Member;

import com.myapp.jsf.util.DataConnect;

@RequestScoped
@ManagedBean
public class LoginDAO {

	@Inject
	private EntityManager em;

	@Inject
	private MemberRepository memberRepository;

	private List<Member> members;

	public static boolean validateSQL(String user, String password) {
		Connection con = null;
		PreparedStatement ps = null;

		try {
			con = DataConnect.getConnection();
			ps = con.prepareStatement("Select uname, password from Users where uname = ? and password = ?");
			ps.setString(1, user);
			ps.setString(2, password);

			ResultSet rs = ps.executeQuery();

			if (rs.next()) {
				// result found, means valid inputs
				return true;
			}
		} catch (SQLException ex) {
			System.out.println("Login error -->" + ex.getMessage());
			return false;
		} finally {
			DataConnect.close(con);
		}
		return false;
	}

	public boolean validateFromForm(String user) {

		retrieveAllMembersOrderedByNameinList();

		for (Member member : members) {
			if (user.equals(member.getName())) {
				return true;
			}
		}
		return false;
	}

	@PostConstruct
	public void retrieveAllMembersOrderedByNameinList() {
		members = memberRepository.findAllOrderedByName();

	}

	// @Named provides access the return value via the EL variable name "members" in the UI (e.g.
	// Facelets or JSP view)
	@Produces
	@Named

	public List<Member> getMembersList() {
		return members;
	}

}